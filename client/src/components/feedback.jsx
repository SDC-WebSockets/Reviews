import React from 'react';
import Search from './search.jsx';
import Stars from './stars.jsx';
import Gauge from './gauge.jsx';
import { xPath } from '../svg.js';
import { ReviewTitle } from '../styles/main.style.js';
import {
  ReviewFeedbackStyle,
  ReviewOverallRating,
  ReviewGrade,
  ReviewTiers,
  ReviewTier,
  ReviewData,
  ReviewPercentage,
  ReviewTierX,
  ReviewControls,
  ReviewTierSelect
} from '../styles/feedback.style.js';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.filterByTier = this.filterByTier.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.renderTransparent = this.renderTransparent.bind(this);
    this.select = React.createRef();
  }

  getPercentage(tier1 = 0, tier2 = 0) {
    let percentage = (tier1 + tier2) / this.props.ratings.totalRatings * 100;
    if (0 < percentage && percentage < 1) {
      return '< 1%';
    }
    return Math.round(percentage) + '%';
  }

  handleClick(tier) {
    if (this.props.currentTier !== null) {
      this.removeFilter();
    } else {
      this.filterByTier(tier);
      this.select.current.value = tier.toString();
      this.renderTransparent(tier);
    }
  }

  handleSelect(e) {
    this.filterByTier(Number(e.target.value));
    this.renderTransparent(e.target.value);
  }

  filterByTier(tier) {
    if (!this.props.currentSearchTerm) {
      this.props.setReviewsFilteredByTier(tier);
    } else {
      this.props.setReviewsFilteredBySearchAndTier(this.props.currentSearchTerm, tier);
    }
  }

  removeFilter() {
    this.props.setReviewsFilteredByTier(0);
    this.select.current.value = '0';
    this.renderTransparent(0);
  }

  renderTransparent(tier) {
    tier = Number(tier);
    const tiers = document.getElementsByClassName('tierWithData');
    for (let i = 0; i < tiers.length; i++) {
      if (tier === 0 || tier === Number(tiers[i].id[4])) {
        tiers[i].style.opacity = '1';
      } else {
        tiers[i].style.opacity = '0.25';
      }
    }
  }

  render() {
    if (this.props.ratings.totalRatings === 0) {
      return (
        <div>
          <ReviewTitle>Student feedback</ReviewTitle>
          <div>This course doesn't have any ratings yet.</div>
        </div>
      );
    } else {
      const tiers = [
        ['5'], ['4 1/2', '4'], ['3 1/2', '3'], ['2 1/2', '2'], ['1 1/2', '1']
      ];
      return (
        <div>
          <ReviewTitle>Student feedback</ReviewTitle>
          <ReviewFeedbackStyle>
            <ReviewOverallRating>
              <ReviewGrade>{this.props.ratings.overallRating.toFixed(1)}
              </ReviewGrade>
              <div>
                <Stars rating={this.props.ratings.overallRating}/>
              </div>
              <div>Course Rating</div>
            </ReviewOverallRating>
            <ReviewTiers>
              {tiers.map((tier) => {
                let percentage;
                let currentTier = Number(tier[tier.length - 1]);
                tier.length === 1 ?
                  percentage = this.getPercentage(this.props.ratings[tier[0]]) :
                  percentage = this.getPercentage(this.props.ratings[tier[0]], this.props.ratings[tier[1]]);
                let portion = Number(percentage.slice(0, percentage.length - 1));
                return (
                  <ReviewTier key={currentTier} style={portion === 0 ?
                    {cursor: 'no-drop', opacity: '.25'} : {cursor: 'pointer'}}>

                    <ReviewData className={portion > 0 ? 'tierWithData' : null} id={`tier${currentTier}`}
                      onClick={portion > 0 ? () => this.handleClick(Number(currentTier)) : null}
                    >
                      <Gauge portion={portion}/>
                      <Stars rating={currentTier}/>
                      <ReviewPercentage>{percentage}</ReviewPercentage>
                    </ReviewData>
                    {this.props.currentTier === currentTier ?
                      <ReviewTierX
                        onClick={portion > 0 ? this.removeFilter : null}
                        style={portion === 0 ? {cursor: 'no-drop'} : {cursor: 'pointer'}}>
                        <svg viewBox="4 4 16 16">
                          <path fill="rgb(115, 114, 108)" d={xPath}/>
                        </svg>
                      </ReviewTierX>
                      : null
                    }
                  </ReviewTier>
                );
              })}
            </ReviewTiers>
          </ReviewFeedbackStyle>
          <div>
            <ReviewTitle>Reviews</ReviewTitle>
            <ReviewControls>
              {this.props.totalReviews && this.props.totalReviews.length > 0 &&
              <Search
                totalReviews={this.props.totalReviews}
                currentTier={this.props.currentTier}
                setReviewsFilteredBySearch={this.props.setReviewsFilteredBySearch}
                setReviewsFilteredBySearchAndTier={this.props.setReviewsFilteredBySearchAndTier}
              />
              }
              <ReviewTierSelect>
                <select className="tierSelect" ref={this.select} onChange={this.handleSelect}>
                  <option value="0">All ratings</option>
                  <option value="5">Five stars</option>
                  <option value="4">Four stars</option>
                  <option value="3">Three stars</option>
                  <option value="2">Two stars</option>
                  <option value="1">One star</option>
                </select>
              </ReviewTierSelect>
            </ReviewControls>
          </div>
        </div>
      );
    }
  }
}



export default Feedback;