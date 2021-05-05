import React from 'react';
import Review from './review.jsx';
import Search from './search.jsx';

class ReviewList extends React.Component { // shows all reviews (displayed 12 at a time)
  constructor(props) {
    // console.log('Props in ReviewList:', props);
    super(props);
    this.setReviews = this.setReviews.bind(this);
    this.state = {
      filteredReviews: null
    };
  }

  setReviews(reviews) {
    if (reviews === null) {
      this.setState({filteredReviews: null});
    } else {
      this.setState({filteredReviews: reviews});
    }
  }

  render() {
    if (!this.props.reviews) {
      return null;
    } else if (this.props.reviews.length === 0) {
      return (
        <div>
          <h2>Reviews</h2>
          <div>This course does not have any reviews yet.</div>
        </div>
      );
    } else {
      let currentReviews;
      this.state.filteredReviews ? currentReviews = this.state.filteredReviews : currentReviews = this.props.reviews;
      return (
        <div>
          <h2>Reviews</h2>
          <Search reviews={this.props.reviews} setReviews={this.setReviews} filtered={this.state.filteredReviews}/>
          {currentReviews.map((review) => <Review key={review._id} review={review}/>)}
        </div>
      );
    }
  }

}

export default ReviewList;