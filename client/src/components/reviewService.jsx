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
    this.setReviewsFilteredBySearch = this.setReviewsFilteredBySearch.bind(this);
    this.setReviewsFilteredByTier = this.setReviewsFilteredByTier.bind(this);

    this.state = {
      totalReviews: null,
      reviewsBySearch: null,
      currentSearchTerm: null,
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

  updateReviews(reviews) {
    this.setState({totalReviews: reviews});
  }

  updateRatings(ratings) {
    this.setState({ratings: ratings});
  }

  setReviewsFilteredBySearch(term) {
    let currentReviews;
    this.state.reviewsByTier === null ? currentReviews = this.state.totalReviews : currentReviews = this.state.reviewsByTier;

    if (term === null || term.trim() === '') {
      this.setState({reviewsBySearch: null});
      this.setState({currentSearchTerm: null});
    } else {
      term = term.toLowerCase().trim();
      this.setState({currentSearchTerm: term});
      let filteredReviews = [];
      currentReviews.forEach((review) => {
        let words = review.comment.toLowerCase().split(' ');
        if (words.includes(term) || words.includes(term + 's')) {
          filteredReviews.push(review);
        }
      });
      console.log(`Reviews with the word ${term}:`, filteredReviews);
      this.setState({reviewsBySearch: filteredReviews});
    }
  }

  setReviewsFilteredByTier(tier) {
    let currentReviews;
    this.state.reviewsBySearch === null ? currentReviews = this.state.totalReviews : currentReviews = this.state.reviewsBySearch;

    if (tier === 'all') {
      this.setState({reviewsByTier: null});
    } else {
      let filteredReviews = [];
      currentReviews.forEach((review) => {
        if (Math.floor(review.rating).toString() === tier) {
          filteredReviews.push(review);
        }
      });
      if (filteredReviews.length > 0) {
        console.log(`Reviews with ${tier} stars:`, filteredReviews);
        this.setState({reviewsByTier: filteredReviews});
      }
    }
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
        <Featured
          review={this.state.featuredReview}/>
        }
        {this.state.ratings &&
        <Feedback
          ratings={this.state.ratings}
          totalReviews={this.state.totalReviews}
          setReviewsFilteredByTier={this.setReviewsFilteredByTier}/>
        }
        {this.state.totalReviews &&
        <ReviewList
          totalReviews={this.state.totalReviews}
          reviewsBySearch={this.state.reviewsBySearch}
          reviewsByTier={this.state.reviewsByTier}
          setReviewsFilteredBySearch={this.setReviewsFilteredBySearch}
          setReviewsFilteredByTier={this.setReviewsFilteredByTier}
          currentSearchTerm={this.state.currentSearchTerm}/>
        }
      </div>
    );
  }
}

export default ReviewService;