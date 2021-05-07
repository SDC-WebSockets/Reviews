import React from 'react';
import Featured from './featured.jsx';
import Feedback from './feedback.jsx';
import ReviewList from './reviewList.jsx';
import Search from './search.jsx';


class ReviewService extends React.Component {
  constructor(props) {
    // console.log('Props in ReviewService:', props);
    super(props);
    this.setReviewsFilteredBySearch = this.setReviewsFilteredBySearch.bind(this);
    this.setReviewsFilteredByTier = this.setReviewsFilteredByTier.bind(this);
    this.setReviewsFilteredBySearchAndTier = this.setReviewsFilteredBySearchAndTier.bind(this);

    this.state = {
      totalReviews: null,
      reviewsBySearch: null,
      reviewsByTier: null,
      reviewsBySearchAndTier: null,
      featuredReview: null,
      ratings: null,
      currentSearchTerm: null
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
        this.updateFeaturedReview(data.reviews);
      });
  }

  updateReviews(reviews) {
    this.setState({totalReviews: reviews});
  }

  updateRatings(ratings) {
    this.setState({ratings: ratings});
  }

  updateFeaturedReview(reviews) {
    if (reviews.length === 0) {
      return;
    }

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

  setReviewsFilteredBySearch(term, currentReviews = this.state.totalReviews) {
    if (term === null || term.trim() === '') {
      this.setState({
        reviewsBySearch: null,
        reviewsBySearchAndTier: null,
        currentSearchTerm: null
      });
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
      return filteredReviews;
    }
  }

  setReviewsFilteredByTier(tier, currentReviews = this.state.totalReviews) {
    if (tier === 0) {
      this.setState({
        reviewsByTier: null,
        reviewsBySearchAndTier: null
      });
    } else {
      let filteredReviews = [];
      currentReviews.forEach((review) => {
        if (Math.floor(review.rating) === tier) {
          filteredReviews.push(review);
        }
      });
      if (filteredReviews.length > 0) {
        console.log(`Reviews with ${tier} stars:`, filteredReviews);
        this.setState({reviewsByTier: filteredReviews});
        return filteredReviews;
      }
    }
  }

  setReviewsFilteredBySearchAndTier(term, tier) {
    let currentReviews;
    let filteredReviews;
    if (this.state.reviewsBySearch && !this.state.reviewsByTier) {
      currentReviews = this.state.reviewsBySearch;
      filteredReviews = this.setReviewsFilteredByTier(tier, currentReviews);
      this.setReviewsFilteredByTier(tier);
    } else if (this.state.reviewsByTier && !this.state.reviewsBySearch) {
      currentReviews = this.state.reviewsByTier;
      filteredReviews = this.setReviewsFilteredBySearch(term, currentReviews);
      this.setReviewsFilteredBySearch(term);
    }
    if (filteredReviews) {
      this.setState({reviewsBySearchAndTier: filteredReviews});
    }

  }

  render() {
    return (
      <div>
        {this.state.featuredReview &&
        <Featured
          review={this.state.featuredReview}
        />
        }
        {this.state.ratings &&
        <Feedback
          ratings={this.state.ratings}
          reviewsBySearch={this.state.reviewsBySearch}

          setReviewsFilteredByTier={this.setReviewsFilteredByTier}
          setReviewsFilteredBySearchAndTier={this.setReviewsFilteredBySearchAndTier}
        />
        }
        {this.state.totalReviews &&
        <Search
          totalReviews={this.state.totalReviews}
          reviewsBySearch={this.state.reviewsBySearch}
          reviewsByTier={this.state.reviewsByTier}
          reviewsBySearchAndTier={this.state.reviewsBySearchAndTier}

          setReviewsFilteredBySearch={this.setReviewsFilteredBySearch}
          setReviewsFilteredByTier={this.setReviewsFilteredByTier}
          setReviewsFilteredBySearchAndTier={this.setReviewsFilteredBySearchAndTier}
        />
        }
        {this.state.totalReviews &&
        <ReviewList
          totalReviews={this.state.totalReviews}
          reviewsBySearch={this.state.reviewsBySearch}
          reviewsByTier={this.state.reviewsByTier}
          reviewsBySearchAndTier={this.state.reviewsBySearchAndTier}
          currentSearchTerm={this.state.currentSearchTerm}
        />
        }
      </div>
    );
  }
}

export default ReviewService;