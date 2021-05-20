import React from 'react';
import Review from './review.jsx';
import moment from 'moment';
import { thumbsUp, thumbsDown } from '../svg.js';

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
  Buttons,
  ButtonContainer,
  Thumbs,
  Report
} from '../styles.js';

const Featured = (props) => (
  <div>
    {props.review && props.review.reviewer &&
      <FeaturedStyle>
        <Title>Featured review</Title>
        <FeaturedReviewer>
          <FeaturedReviewerAvatar className="featuredReviewerAvatar">
            {/* if the reviewer has no avatar, the default avatar consists of a saved color background and the reviewer's initials */}
            {props.review.reviewer.picture.slice(0, 3) === 'rgb' ?
              <FeaturedReviewerInitials className="featuredReviewerInitials"style={{backgroundColor: props.review.reviewer.picture}}>{props.review.reviewer.name.split(' ').map((n)=>n[0]).join('').slice(0, 2)}</FeaturedReviewerInitials> :
              <FeaturedReviewerPicture className="featuredReviewerPicture" src={props.review.reviewer.picture}/>}
          </FeaturedReviewerAvatar>
          <FeaturedReviewerMetadata className="featuredReviewerMetadata">
            <Name className="reviewerName">{props.review.reviewer.name}</Name>
            <div className="reviewerCoursesTaken">{props.review.reviewer.coursesTaken} {props.review.reviewer.reviews === 1 ? 'course' : 'courses'}</div>
            <div className="reviewerReviews">{props.review.reviewer.reviews} {props.review.reviewer.reviews === 1 ? 'review' : 'reviews'}</div>
          </FeaturedReviewerMetadata>
        </FeaturedReviewer>
        <Rating>
          <div className="reviewRating">{props.review.rating}</div>
          <Moment className="reviewDate">{moment(props.review.createdAt).fromNow()}</Moment>
        </Rating>
        <Comment>
          <div className="reviewComment">{props.review.comment}</div>
          <Helpful>Was this review helpful?</Helpful>
          <Buttons>
            <ButtonContainer>
              <Thumbs className="thumbs-up" value="yes">
                <span dangerouslySetInnerHTML={{ __html: thumbsUp }}></span>
              </Thumbs>
            </ButtonContainer>
            <ButtonContainer>
              <Thumbs className="thumbs-down" value="no"><span dangerouslySetInnerHTML={{ __html: thumbsDown }}></span>
              </Thumbs>
            </ButtonContainer>
            <ButtonContainer>
              <Report>Report</Report>
            </ButtonContainer>
          </Buttons>
        </Comment>
      </FeaturedStyle>
    }
  </div>
);

export default Featured;