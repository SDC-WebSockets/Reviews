import React from 'react';
import Review from './review.jsx';
import moment from 'moment';

import {
  FeaturedStyle,
  Title,
  FeaturedReviewer,
  FeaturedReviewerAvatar,
  FeaturedReviewerInitials,
  FeaturedReviewerPicture,
  FeaturedReviewerMetadata,
  Name,
  Rating,
  Moment,
  Comment,
  Helpful,
  Report
} from '../styles.js';
import {randomColor} from '../randomColor.js';

const Featured = (props) => (
  <div>
    {props.review && props.review.reviewer &&
      <FeaturedStyle>
        <Title>Featured review</Title>
        <FeaturedReviewer>
          <FeaturedReviewerAvatar>
            {/* if the reviewer has no avatar, the default avatar consists of reviewer's initials */}
            {props.review.reviewer.picture === null ?
              <FeaturedReviewerInitials style={{backgroundColor: randomColor()}}>{props.review.reviewer.name.split(' ').map((n)=>n[0]).join('').slice(0, 2)}</FeaturedReviewerInitials> :
              <FeaturedReviewerPicture src={props.review.reviewer.picture}/>}
          </FeaturedReviewerAvatar>
          <FeaturedReviewerMetadata>
            <Name>{props.review.reviewer.name}</Name>
            <div className="reviewerCoursesTaken">{props.review.reviewer.coursesTaken} {props.review.reviewer.reviews === 1 ? 'course' : 'courses'}</div>
            <div className="reviewerReviews">{props.review.reviewer.reviews} {props.review.reviewer.reviews === 1 ? 'review' : 'reviews'}</div>
          </FeaturedReviewerMetadata>
        </FeaturedReviewer>
        <Rating>
          <div className="reviewRating">{props.review.rating}</div>
          <Moment>{moment(props.review.createdAt).fromNow()}</Moment>
        </Rating>
        <Comment>
          <div className="reviewComment">{props.review.comment}</div>
          <Helpful>Was this review helpful?</Helpful>
          <button className="thumbs-up" value="yes">[thumbs-up]
          </button>
          <button className="thumbs-down" value="no">[thumbs-down]</button>
          <Report>Report</Report>
        </Comment>
      </FeaturedStyle>
    }
  </div>
);

export default Featured;