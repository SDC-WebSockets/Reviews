import React from 'react';
import Review from './review.jsx';
import SearchMessage from './searchMessage.jsx';

// note for later: only display 12 reviews ("See more reviews" displays 12 more)

const ReviewList = (props) => {
  // console.log('Props in ReviewList:', props);
  if (props.totalReviews.length === 0) {
    return (
      <div>
        <h2>Reviews</h2>
        <div>This course does not have any reviews yet.</div>
      </div>
    );
  } else {
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
      <div>
        {props.reviewsBySearch ?
          <SearchMessage currentReviews={currentReviews} term={props.currentSearchTerm}/> : null}
        <h2>Reviews</h2>
        {currentReviews.map((review) => <Review key={review._id} review={review} currentSearchTerm={props.currentSearchTerm}/>)}
      </div>
    );
  }
};

export default ReviewList;