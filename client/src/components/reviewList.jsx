import React from 'react';
import Review from './review.jsx';
import Search from './search.jsx';

const ReviewList = (props) => {
  if (props.totalReviews.length === 0) {
    return (
      <div>
        <h2>Reviews</h2>
        <div>This course does not have any reviews yet.</div>
      </div>
    );
  } else {
    let currentReviews;
    if (props.reviewsBySearch) {
      currentReviews = props.reviewsBySearch;
    } else if (props.reviewsByTier) {
      currentReviews = props.reviewsByTier;
    } else {
      currentReviews = props.totalReviews;
    }
    return (
      <div>
        <h2>Reviews</h2>
        <Search propsFromReviewService={props}/>
        {currentReviews.map((review) => <Review key={review._id} review={review} currentSearchTerm={props.currentSearchTerm}/>)}
      </div>
    );
  }
};

// class ReviewList extends React.Component { // shows all reviews (displayed 12 at a time)
//   constructor(props) {
//     // console.log('Props in ReviewList:', props);
//     super(props);
//   }

//   render() {
//     if (props.totalReviews.length === 0) {
//       return (
//         <div>
//           <h2>Reviews</h2>
//           <div>This course does not have any reviews yet.</div>
//         </div>
//       );
//     } else {
//       let currentReviews;
//       if (props.reviewsBySearch) {
//         currentReviews = props.reviewsBySearch;
//       } else if (props.reviewsByTier) {
//         currentReviews = props.reviewsByTier;
//       } else {
//         currentReviews = props.totalReviews;
//       }
//       return (
//         <div>
//           <h2>Reviews</h2>
//           <Search propsFromReviewService={props}/>
//           {currentReviews.map((review) => <Review key={review._id} review={review} currentSearchTerm={props.currentSearchTerm}/>)}
//         </div>
//       );
//     }
//   }
// }

export default ReviewList;