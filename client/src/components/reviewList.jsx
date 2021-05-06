import React from 'react';
import Review from './review.jsx';
import Search from './search.jsx';

class ReviewList extends React.Component { // shows all reviews (displayed 12 at a time)
  constructor(props) {
    // console.log('Props in ReviewList:', props);
    super(props);
  }

  render() {
    if (this.props.totalReviews.length === 0) {
      return (
        <div>
          <h2>Reviews</h2>
          <div>This course does not have any reviews yet.</div>
        </div>
      );
    } else {
      let currentReviews;
      // console.log(this.props.reviewsBySearch);
      // console.log(this.props.reviewsByTier);
      // console.log(this.props.totalReviews);

      if (this.props.reviewsBySearch) {
        currentReviews = this.props.reviewsBySearch;
      } else if (this.props.reviewsByTier) {
        currentReviews = this.props.reviewsByTier;
      } else {
        currentReviews = this.props.totalReviews;
      }
      return (
        <div>
          <h2>Reviews</h2>
          <Search propsFromReviewService={this.props}/>
          {currentReviews.map((review) => <Review key={review._id} review={review} currentSearchTerm={this.props.currentSearchTerm}/>)}
        </div>
      );
    }
  }
}

export default ReviewList;