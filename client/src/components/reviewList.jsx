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

  const showTwelveReviews = (startIndex, endIndex) => {
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
      {showTwelveReviews(0)}
      {currentReviews.length > 12 &&
      <SeeMoreReviewsContainer>
        <SeeMoreReviews onClick={() => { /* showTwelveReviews(13, 24); */ }}>See more reviews</SeeMoreReviews>
      </SeeMoreReviewsContainer>
      }
    </div>
  );
};

export default ReviewList;