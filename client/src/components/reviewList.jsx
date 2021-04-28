import React from 'react';
import Review from './review.jsx';
import Search from './search.jsx';

const ReviewList = (props) => ( // shows all reviews (displayed 12 at a time)
  <div>
    <h2>Reviews</h2>
    <Search />
    <select>
      <option value>All ratings</option>
      <option value="5">Five stars</option>
      <option value="4">Four stars</option>
      <option value="3">Three stars</option>
      <option value="2">Two stars</option>
      <option value="1">One star</option>
    </select>
    <Review />
    <Review />
    <Review />
    <Review />
    <Review />
  </div>
)

export default ReviewList;