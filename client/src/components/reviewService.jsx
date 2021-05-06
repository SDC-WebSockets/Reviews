import React from 'react';
import Featured from './featured.jsx';
import Feedback from './feedback.jsx';
import ReviewList from './reviewList.jsx';


class ReviewService extends React.Component {
  constructor(props) {
    // console.log('Props in ReviewService:', props);
    super(props);
    this.updateReviews = this.updateReviews.bind(this);
    this.updateRatings = this.updateRatings.bind(this);
    this.state = {
      totalReviews: null,
      reviewsByTier: null,
      ratings: null,
      featuredReview: null
    };
  }

  componentDidMount() {
    this.getReviews(this.props.courseId);
  }

  getReviews(id) {
    fetch(`http://localhost:2712/reviews/item?courseId=${id}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Data from server:', data);
        this.updateReviews(data.reviews);
        this.updateRatings(data.ratings);
        this.chooseBestReview(data.reviews);
      });
  }

  // function to update reviewList's state on star tier select (prevent refresh)
  updateReviews(reviews, tier) {
    if (!tier) {
      this.setState({totalReviews: reviews});
    } else if (tier === 'all') {
      this.setState({reviewsByTier: null});
    } else {
      let reviewsByTier = [];
      reviews.forEach((review) => {
        if (Math.floor(review.rating).toString() === tier) {
          reviewsByTier.push(review);
        }
      });
      if (reviewsByTier.length > 0) {
        console.log(`Reviews with ${tier} stars:`, reviewsByTier);
        this.setState({reviewsByTier: reviewsByTier});
      }
    }
  }

  updateRatings(ratings) {
    this.setState({ratings: ratings});
  }

  chooseBestReview(reviews) {
    if (reviews) {
      let bestReview = reviews[0];
      let tiedBest = [reviews[0]];
      for (let i = 1; i < reviews.length; i++) {
        if (reviews[i].rating > bestReview.rating) {
          bestReview = reviews[i];
          tiedBest = [reviews[i]];
        } else if (reviews[i].rating === bestReview.rating) {
          tiedBest.push(reviews[i]);
        }
      }
      if (tiedBest.length > 1) {
        bestReview = tiedBest[0];
        for (let j = 1; j < tiedBest.length; j++) {
          if (tiedBest[j].comment.length > bestReview.comment.length) {
            bestReview = tiedBest[j];
          }
        }
      }
      this.setState({featuredReview: bestReview});
    }
  }

  render() {
    return (
      <div>
        {this.state.featuredReview &&
        <Featured review={this.state.featuredReview}/>
        }
        {this.state.ratings &&
        <Feedback ratings={this.state.ratings} totalReviews={this.state.totalReviews} updateReviews={this.updateReviews}/>
        }
        {this.state.totalReviews &&
        <ReviewList totalReviews={this.state.totalReviews} reviewsByTier={this.state.reviewsByTier} updateReviews={this.updateReviews}/>
        }
      </div>
    );
  }
}

export default ReviewService;