import React from 'react';
import Review from './review.jsx';
import Search from './search.jsx';

class ReviewList extends React.Component { // shows all reviews (displayed 12 at a time)
  constructor(props) {
    // console.log('Props in ReviewList:', props);
    super(props);
    this.setFilteredReviews = this.setFilteredReviews.bind(this);
    this.state = {
      filteredReviews: null
    };
  }

  setFilteredReviews(reviews) {
    if (reviews === null) {
      this.setState({filteredReviews: null});
    } else {
      this.setState({filteredReviews: reviews});
    }
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
      if (this.state.filteredReviews) {
        currentReviews = this.state.filteredReviews;
      } else if (this.props.reviewsByTier) {
        currentReviews = this.props.reviewsByTier;
      } else {
        currentReviews = this.props.totalReviews;
      }
      return (
        <div>
          <h2>Reviews</h2>
          <Search totalReviews={this.props.totalReviews} setFilteredReviews={this.setFilteredReviews} filtered={this.state.filteredReviews} updateReviews={this.props.updateReviews}/>
          {currentReviews.map((review) => <Review key={review._id} review={review}/>)}
        </div>
      );
    }
  }

}

export default ReviewList;