import React from 'react';
import Featured from './components/featured.jsx';
import Feedback from './components/feedback.jsx';
import Search from './components/search.jsx';
import SearchMessage from './components/searchMessage.jsx';
import ReviewList from './components/reviewList.jsx';
import fetch from 'node-fetch';
import { getBestReview, filterReviewsByTerm, filterReviewsByTier } from './filters.js';
import querystring from 'querystring';

import { MainStyle } from './styles/main.style.js';


class ReviewService extends React.Component {
  constructor(props) {
    super(props);
    this.getReviews = this.getReviews.bind(this);
    this.setReviewsFilteredBySearch = this.setReviewsFilteredBySearch.bind(this);
    this.setReviewsFilteredByTier = this.setReviewsFilteredByTier.bind(this);
    this.setReviewsFilteredBySearchAndTier = this.setReviewsFilteredBySearchAndTier.bind(this);
    this.showTwelveMoreReviews = this.showTwelveMoreReviews.bind(this);
    this.state = {
      courseId: Number(querystring.parse(window.location.search)['?courseId']),
      totalReviews: null,
      currentSearchTerm: null,
      reviewsBySearch: null,
      currentTier: null,
      reviewsByTier: null,
      reviewsBySearchAndTier: null,
      featuredReview: null,
      ratings: null,
      displayedReviews: null
    };
    this.host = 'http://ec2-54-176-79-167.us-west-1.compute.amazonaws.com:2712'; // http://localhost:2712
    this.getReviews(this.state.courseId);
  }

  getReviews(id) {
    fetch(`${this.host}/reviews/item?courseId=${id}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === 'No course selected') {
          this.setState({courseId: null});
        } else {
          this.setState({courseId: data.courseId});
          this.updateReviews(data.reviews);
          this.updateRatings(data.ratings);
          this.updateFeaturedReview(data.reviews);
        }
      })
      .catch((err) => {
        console.log('Error retrieving data from server:', err);
      });
  }

  updateReviews(reviews) {
    this.setState({
      totalReviews: reviews,
      displayedReviews: reviews.slice(0, 12)
    });
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
        currentSearchTerm: null,
        displayedReviews: this.state.reviewsByTier ? this.state.reviewsByTier.slice(0, 12) : this.state.totalReviews.slice(0, 12)
      });
    } else {
      let filteredReviews = filterReviewsByTerm(reviews, term);
      this.setState({
        reviewsBySearch: filteredReviews,
        currentSearchTerm: term,
        displayedReviews: filteredReviews.slice(0, 12)
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
        currentTier: null,
        displayedReviews: this.state.reviewsBySearch ? this.state.reviewsBySearch.slice(0, 12) : this.state.totalReviews.slice(0, 12)
      });
    } else {
      let filteredReviews = filterReviewsByTier(reviews, tier);
      this.setState({
        reviewsByTier: filteredReviews,
        currentTier: tier,
        displayedReviews: filteredReviews.slice(0, 12)
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
    const filteredReviewsByTierAndTerm = filterReviewsByTerm(filteredReviewsByTier, term);
    this.setState({
      reviewsBySearchAndTier: filteredReviewsByTierAndTerm,
      displayedReviews: filteredReviewsByTierAndTerm.slice(0, 12)
    });
  }

  showTwelveMoreReviews () {
    let currentReviews;
    let currentlyDisplayed = this.state.displayedReviews.length;
    if (this.state.reviewsBySearchAndTier) {
      currentReviews = this.state.reviewsBySearchAndTier;
    } else if (this.state.reviewsBySearch && !this.state.reviewsByTier) {
      currentReviews = this.state.reviewsBySearch;
    } else if (this.state.reviewsByTier && !this.state.reviewsBySearch) {
      currentReviews = this.state.reviewsByTier;
    } else {
      currentReviews = this.state.totalReviews;
    }
    this.setState({displayedReviews: currentReviews.slice(0, currentlyDisplayed + 12)});
  }

  render() {
    if (!this.state.courseId) {
      return (
        <MainStyle>Course not found</MainStyle>
      );
    } else {
      return (
        <MainStyle>
          {this.state.featuredReview && this.state.totalReviews && this.state.totalReviews.length >= 10 &&
          <Featured
            review={this.state.featuredReview}
          />
          }
          {this.state.ratings &&
          <Feedback
            totalReviews={this.state.totalReviews}
            ratings={this.state.ratings}
            currentSearchTerm={this.state.currentSearchTerm}
            currentTier={this.state.currentTier}
            setReviewsFilteredByTier={this.setReviewsFilteredByTier}
            setReviewsFilteredBySearch={this.setReviewsFilteredBySearch}
            setReviewsFilteredBySearchAndTier={this.setReviewsFilteredBySearchAndTier}
          />
          }
          {(this.state.reviewsBySearchAndTier || this.state.reviewsBySearch || this.state.reviewsByTier) &&
          <SearchMessage
            reviewsBySearchAndTier={this.state.reviewsBySearchAndTier}
            reviewsBySearch={this.state.reviewsBySearch}
            currentSearchTerm={this.state.currentSearchTerm}
            reviewsByTier={this.state.reviewsByTier}
          />
          }
          {this.state.totalReviews && this.state.totalReviews.length > 0 &&
          <ReviewList
            displayedReviews={this.state.displayedReviews}
            totalReviews={this.state.totalReviews}
            reviewsBySearch={this.state.reviewsBySearch}
            reviewsByTier={this.state.reviewsByTier}
            reviewsBySearchAndTier={this.state.reviewsBySearchAndTier}
            currentSearchTerm={this.state.currentSearchTerm}
            showTwelveMoreReviews={this.showTwelveMoreReviews}
          />
          }
        </MainStyle>
      );
    }
  }
}

export default ReviewService;