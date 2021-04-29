import React from 'react';
import Review from './review.jsx';
import Search from './search.jsx';

const ReviewList = (props) => { // shows all reviews (displayed 12 at a time)
  if (props.ratings === undefined) {
    return null;
  } else {
    console.log('Props in ReviewList:', props);
    return (
      <div>
        <h2>Reviews</h2>
        <Search />

        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
      </div>
    );
  }

};

export default ReviewList;