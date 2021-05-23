import React from 'react';
import Review from './review.jsx';
import { ReviewListStyle, SeeMoreReviews, SeeMoreReviewsContainer } from '../styles/reviewList.style.js';

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

  const showReviews = (startIndex, endIndex) => {
    if (!endIndex) {
      endIndex = currentReviews.length;
    }
    if (!startIndex) {
      startIndex = 0;
    }
    return (
      <ReviewListStyle>
        {currentReviews.slice(startIndex, endIndex).map((review, index) => <Review currentReviews={currentReviews} key={index + startIndex} reviewNumber={index + startIndex + 1} review={review} currentSearchTerm={props.currentSearchTerm}/>)}
      </ReviewListStyle>
    );
  };

  return (
    <div>
      {showReviews(0, 12)}
      {currentReviews.length > 12 &&
      <SeeMoreReviewsContainer>
        <SeeMoreReviews onClick={() => { console.log('this will show the next 12 reviews'); }}>See more reviews</SeeMoreReviews>
      </SeeMoreReviewsContainer>
      }
    </div>
  );
};

export default ReviewList;