import React from 'react';
import Review from './review.jsx';
import { ReviewListStyle } from '../styles/reviewList.style.js';

// note for later: only display 12 reviews ("See more reviews" displays 12 more)

const ReviewList = (props) => {
  // console.log('Props in ReviewList:', props);
  let currentReviews;
  if (props.reviewsBySearchAndTier) {
    currentReviews = props.reviewsBySearchAndTier;
  } else if (props.reviewsBySearch && !props.reviewsByTier) {
    currentReviews = props.reviewsBySearch;
  } else if (props.reviewsByTier && !props.reviewsBySearch) {
    currentReviews = props.reviewsByTier;
  } else {
    currentReviews = props.totalReviews;
  }
  return (
    <ReviewListStyle>
      {currentReviews.map((review) => <Review key={review._id} review={review} currentSearchTerm={props.currentSearchTerm}/>)}
    </ReviewListStyle>
  );

};

export default ReviewList;