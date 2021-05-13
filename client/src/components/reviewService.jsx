import React from 'react';
import Featured from './featured.jsx';
import Feedback from './feedback.jsx';
import ReviewList from './reviewList.jsx';
import Search from './search.jsx';
import fetch from 'node-fetch';
import { getBestReview, filterReviewsByTerm, filterReviewsByTier } from '../filters.js';


class ReviewService extends React.Component {
  constructor(props) {
    // console.log('Props in ReviewService:', props);
    super(props);
    this.getReviews = this.getReviews.bind(this);
    this.setReviewsFilteredBySearch = this.setReviewsFilteredBySearch.bind(this);
    this.setReviewsFilteredByTier = this.setReviewsFilteredByTier.bind(this);
    this.setReviewsFilteredBySearchAndTier = this.setReviewsFilteredBySearchAndTier.bind(this);

    this.state = {
      totalReviews: null,
      currentSearchTerm: null,
      reviewsBySearch: null,
      currentTier: null,
      reviewsByTier: null,
      reviewsBySearchAndTier: null,
      featuredReview: null,
      ratings: null
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
      .then((response) => response.json())
      .then((data) => {
        // console.log('Data from server:', data);
        this.updateReviews(data.reviews);
        this.updateRatings(data.ratings);
        this.updateFeaturedReview(data.reviews);
      })
      .catch((err) => {
        // console.log('Error retrieving data from server:', err);
      });
  }

  updateReviews(reviews) {
    this.setState({totalReviews: reviews});
  }

  updateRatings(ratings) {
    this.setState({ratings: ratings});
  }

  updateFeaturedReview(reviews) {
    const bestReview = getBestReview(reviews);
    this.setState({featuredReview: bestReview});
  }

  setReviewsFilteredBySearch(term, reviews = this.state.totalReviews) {
    if (term === null || term === '') {
      this.setState({
        reviewsBySearch: null,
        reviewsBySearchAndTier: null,
        currentSearchTerm: null
      });
    } else {
      let filteredReviews = filterReviewsByTerm(reviews, term);
      this.setState({
        reviewsBySearch: filteredReviews,
        currentSearchTerm: term
      });
      // console.log(`Reviews with the word ${term}:`, filteredReviews);
      return filteredReviews;
    }
  }

  setReviewsFilteredByTier(tier, reviews = this.state.totalReviews) {
    if (tier === 0) {
      this.setState({
        reviewsByTier: null,
        reviewsBySearchAndTier: null,
        currentTier: null
      });
    } else {
      let filteredReviews = filterReviewsByTier(reviews, tier);
      this.setState({
        reviewsByTier: filteredReviews,
        currentTier: tier
      });
      // console.log(`Reviews with ${tier} stars:`, filteredReviews);
      return filteredReviews;
    }
  }

  setReviewsFilteredBySearchAndTier(term, tier) {
    const totalReviews = this.state.totalReviews;
    this.setReviewsFilteredBySearch(term, totalReviews);
    this.setReviewsFilteredByTier(tier, totalReviews);
    const filteredReviewsByTier = filterReviewsByTier(totalReviews, tier);
    const filterReviewsByTierAndTerm = filterReviewsByTerm(filteredReviewsByTier, term);
    this.setState({reviewsBySearchAndTier: filterReviewsByTierAndTerm});
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
          currentSearchTerm={this.state.currentSearchTerm}
          currentTier={this.state.currentTier}
          setReviewsFilteredByTier={this.setReviewsFilteredByTier}
          setReviewsFilteredBySearchAndTier={this.setReviewsFilteredBySearchAndTier}
        />
        }
        {this.state.totalReviews && this.state.totalReviews.length > 0 &&
        <Search
          totalReviews={this.state.totalReviews}
          currentTier={this.state.currentTier}
          setReviewsFilteredBySearch={this.setReviewsFilteredBySearch}
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