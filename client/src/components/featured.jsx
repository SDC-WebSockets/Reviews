import React from 'react';
import Rating from './rating.jsx';
import Comment from './comment.jsx';
import Buttons from './buttons.jsx';
import { Title } from '../styles/main.style.js';
import {
  FeaturedStyle,
  FeaturedReviewer,
  FeaturedReviewerAvatar,
  FeaturedReviewerInitials,
  FeaturedReviewerPicture,
  FeaturedReviewerMetadata
} from '../styles/featured.style.js';
import {Name} from '../styles/review.style.js';

const Featured = (props) => (
  <div>
    {/* {console.log('Props in Featured:', props)} */}
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
        <Rating rating={props.review.rating} createdAt={props.review.createdAt}/>
        <Comment review={props.review} currentSearchTerm={props.currentSearchTerm}/>
        <Buttons/>
      </FeaturedStyle>
    }
  </div>
);

export default Featured;