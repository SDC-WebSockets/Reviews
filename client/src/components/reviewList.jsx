import React from 'react';
import Review from './review.jsx';
import Search from './search.jsx'

const ReviewList = (props) => (
  <div>
    <h2>Reviews</h2>
    <Search />
    <Review />
    <Review />
    <Review />
    <Review />
    <Review />
  </div>
)

export default ReviewList;