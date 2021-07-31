# ***** IMPORT PACKAGES *****
import numpy as np
import pandas as pd
import os
import sys
import csv
import re
import math
import json
from datetime import datetime, timedelta
import random
import hashlib
from faker import Faker

curDir = os.path.abspath(os.path.dirname('__file__'))

# ***** GENERAL FILE MANAGEMENT FUNCTIONS *****
def loadCSVFile(fname, delim):
  df = pd.DataFrame(pd.read_csv(os.path.join(curDir, fname), header=0, delimiter=delim))
  return df

def saveCSVFile(df, fname, delim):
  df.to_csv(os.path.join(curDir, fname), index=False, sep=delim)

# ***** DATA GENERATION HELPER FUNCTIONS *****
def randomInclusiveInteger(min, max):
  return math.floor(random.random() * (max - min + 1) + min)

def randomDate():
  start = datetime(2021, 5, 1, 0, 0, 0)
  delta = datetime.today() - start
  int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
  random_second = random.randrange(int_delta)
  return start + timedelta(seconds=random_second)

fake = Faker()

colors = ['rgb(77, 171, 101)', 'rgb(156, 70, 127)', 'rgb(240, 189, 79)', 'rgb(115, 114, 108)', 'rgb(40, 150, 169)']

def randomColor():
  return colors[randomInclusiveInteger(0, len(colors) - 1)]


# ***** SCHEMA GENERATING FUNCTIONS *****
def generateRating(courseId):
  rating = {'courseId': courseId, 'overallRating': 'empty', 'totalRatings': 0, 'totalStars': 'empty', 'five': 0, 'fourhalf': 0, 'four': 0, 'threehalf': 0, 'three': 0, 'twohalf': 0, 'two': 0, 'onehalf': 0, 'one': 0}
  return rating

def generateRandomReview(courseId):
  # make if likely to have good ratings
  ratings = [5, 5, 5, 5, 5, 5, 5, 5, 4.5, 4.5, 4, 4, 4, 3.5, 3, 2.5, 2, 1.5, 1, 1]
  randomRating = ratings[randomInclusiveInteger(0, len(ratings) - 1)]
  randomComment = '<br>'.join(fake.text().split('\n'))
  # random date within 3 months
  randomTime = randomDate().isoformat()
  randomHelpful = randomInclusiveInteger(1, 50)

  randomReview = {'courseId': courseId, 'rating': randomRating, 'comment': randomComment, 'createdAt': randomTime, 'helpful': randomHelpful, 'reported': False}
  return randomReview

def generateRandomReviewer(i):
  reviewerHashSeed = 'reviewer' + str(i)
  randomReviewerId = hashlib.md5(reviewerHashSeed.encode()).hexdigest()
  reviewCount = 0
  randomName = fake.name()
  randomAvatar = 'https://rpt27-sdc-websockets.s3.us-west-2.amazonaws.com/avatars/avatar{0}.jpg'.format(randomInclusiveInteger(0, 999))
  avatars = [randomColor(), randomColor(), randomColor(), randomAvatar]
  avatarOrNoAvatar = avatars[randomInclusiveInteger(0, 3)]
  randomNoOfCourses = 0

  randomReviewer = {'reviewerId': randomReviewerId, 'name': randomName, 'picture': avatarOrNoAvatar, 'coursesTakem': randomNoOfCourses, 'reviews': reviewCount}
  return randomReviewer


# ***** CREATE COURSE FUNCTION *****
def createCourses(start, noOfCourses):
  reviews = []
  reviewers = []
  ratings = []

  # create fake reviewer ids
  for i in range(start, noOfCourses + 1):
    if i % 100000 == 0:
      print('finished creating {0} reviewers'.format(i))
    reviewers.append(generateRandomReviewer(i))

  reviewers_df = pd.DataFrame(reviewers)
  reviewerIdList = reviewers_df['reviewerId'].to_list()

  # create fake courses
  for i in range(start, noOfCourses + 1):
    if i % 10000 == 0:
      print('milestone: {0} courses written to file'.format(i))

    rating = generateRating(i)
    rating['id'] = hashlib.md5(str(i).encod()).hexdigest()
    randCourseCount = randomInclusiveInteger(1, 30)
    rating['totalRatings'] = randCourseCount
    ratings.append(rating)

    for j in range(0, randCourseCount):
      randomReview = generateRandomReview(i)
      reviewHashSeed = 'review_course' str(i) + '_rev_' + str(j)
      randomReview['id'] = hashlib.md5(reviewHashSeed.encode()).hexdigest()
      randomReview['reviewer'] = reviewerIdList[randomInclusiveInteger(0, len(reviewerIdList) - 1)]
      reviews.append(randomReview)

  # convert to dataframe (table)
  reviews_df = pd.DataFrame(reviews)
  ratings_df = pd.DataFrame(ratings)

  # get aggregate values and scores
  totalReviewsByReviewer = reviews_df['reviewer'].value_counts()
  reviewers_df['reviews'] = reviewers_df['reviewerId'].apply(lambda x: totalReviewsByReviewer.loc[x])
  reviewers_df['coursesTaken'] = reviewers_df['reviews'].apply(lambda x: randomInclusiveInteger(int(x), int(x) + 3))
  totalReviews = reviews_df.groupby(['courseId', 'rating']).count()['id']

  def getRatingCount(target, x):
    try:
      return totalReviews.loc[x, target]
    except:
      return 0

  ratings_df['five'] = ratings_df['courseId'].apply(lambda x: getRatingCount(5.0, x))
  ratings_df['fourhalf'] = ratings_df['courseId'].apply(lambda x: getRatingCount(4.5, x))
  ratings_df['four'] = ratings_df['courseId'].apply(lambda x: getRatingCount(4.0, x))
  ratings_df['threehalf'] = ratings_df['courseId'].apply(lambda x: getRatingCount(3.5, x))
  ratings_df['three'] = ratings_df['courseId'].apply(lambda x: getRatingCount(3.0, x))
  ratings_df['twohalf'] = ratings_df['courseId'].apply(lambda x: getRatingCount(2.5, x))
  ratings_df['two'] = ratings_df['courseId'].apply(lambda x: getRatingCount(2.0, x))
  ratings_df['onehalf'] = ratings_df['courseId'].apply(lambda x: getRatingCount(1.5, x))
  ratings_df['one'] = ratings_df['courseId'].apply(lambda x: getRatingCount(1.0, x))

  overallReviews = reviews_df.groupby('courseId')['rating'].mean()
  totalStars = reviews_df.groupby('courseId')['rating'].sum()
  ratings_df['overallRating'] = ratings_df['courseId'].apply(lambda x: round(overallReviews.loc[x], 2))
  ratings_df['totalStars'] = ratings_df['courseId'].apply(lambda x: totalStars.loc[x])

  # save to csv
  saveCSVFile(reviews_df, 'reviews{0}.csv'.format(i / 1000000), ',')
  saveCSVFile(reviewers_df, 'reviewers{0}.csv'.format(i / 1000000), '|')
  saveCSVFile(ratings_df, 'ratings{0}.csv'.format(i / 1000000), ',')


# ***** EXECUTION *****
createCourses(1, 1000000)
createCourses(1000001, 2000000)
createCourses(2000001, 3000000)
createCourses(3000001, 4000000)
createCourses(4000001, 5000000)
createCourses(5000001, 6000000)
createCourses(6000001, 7000000)
createCourses(7000001, 8000000)
createCourses(8000001, 9000000)
createCourses(9000001, 10000000)
