import React from 'react';
import Review from './review.jsx';
import Search from './search.jsx';

const ReviewList = (props) => { // shows all reviews (displayed 12 at a time)
  // console.log('Props in ReviewList:', props);
  if (props.reviews === undefined) {
    return null;
  } else {
    return (
      <div>
        <h2>Reviews</h2>
        <Search />

        {props.reviews.map((review) => <Review key={review._id} review={review}/>)}
      </div>
    );
  }

};

export default ReviewList;