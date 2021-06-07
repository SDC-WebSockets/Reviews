import React from 'react';
import Search from './search.jsx';
import Stars from './stars.jsx';
import Gauge from './gauge.jsx';
import { xPath } from '../svg.js';
import { ReviewTitle } from '../styles/main.style.js';
import {
  FeedbackWrapper,
  NoFeedback,
  FeedbackStyle,
  OverallRating,
  CourseGrade,
  StarsWrapper,
  CourseRatingTitle,
  Tiers,
  Tier,
  Data,
  Percentage,
  TierX,
  SearchControlsWrapper,
  SearchControls,
  TierSelect,
  TierOption
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
    let clickedTier = Number(document.getElementById(`tier${tier}`).id.slice(4));
    if (this.props.currentTier === clickedTier) {
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
    console.log(tier);
    if (!tier || tier === 0) {
      this.select.current.style.color = 'rgb(115, 114, 108)';
      this.select.current.style.borderColor = 'rgb(152, 149, 134)';
    } else {
      this.select.current.style.color = 'rgb(60, 59, 55)';
      this.select.current.style.borderColor = 'rgb(118, 118, 118)';
    }
  }

  removeFilter() {
    this.props.setReviewsFilteredByTier(0);
    this.select.current.value = '0';
    this.renderTransparent(0);
    this.select.current.style.color = 'rgb(115, 114, 108)';
    this.select.current.style.borderColor = 'rgb(152, 149, 134)';
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
        <FeedbackWrapper>
          <ReviewTitle>Student feedback</ReviewTitle>
          <NoFeedback>This course doesn't have any ratings yet.</NoFeedback>
        </FeedbackWrapper>
      );
    } else {
      const tiers = [
        ['5'], ['4 1/2', '4'], ['3 1/2', '3'], ['2 1/2', '2'], ['1 1/2', '1']
      ];
      return (
        <FeedbackWrapper>
          <ReviewTitle>Student feedback</ReviewTitle>
          <FeedbackStyle>
            <OverallRating>
              <CourseGrade>{this.props.ratings.overallRating.toFixed(1)}
              </CourseGrade>
              <StarsWrapper>
                <Stars rating={this.props.ratings.overallRating}/>
              </StarsWrapper>
              <CourseRatingTitle>Course Rating</CourseRatingTitle>
            </OverallRating>
            <Tiers>
              {tiers.map((tier) => {
                let percentage;
                let currentTier = Number(tier[tier.length - 1]);
                tier.length === 1 ?
                  percentage = this.getPercentage(this.props.ratings[tier[0]]) :
                  percentage = this.getPercentage(this.props.ratings[tier[0]], this.props.ratings[tier[1]]);
                let portion = Number(percentage.slice(0, percentage.length - 1));
                return (
                  <Tier key={currentTier} style={portion === 0 ?
                    {cursor: 'no-drop', opacity: '.25'} : {cursor: 'pointer'}}>

                    <Data className={portion > 0 ? 'tierWithData' : null} id={`tier${currentTier}`}
                      onClick={portion > 0 ? () => this.handleClick(Number(currentTier)) : null}
                    >
                      <Gauge portion={portion}/>
                      <Stars rating={currentTier}/>
                      <Percentage>{percentage}</Percentage>
                    </Data>
                    {this.props.currentTier === currentTier ?
                      <TierX
                        onClick={portion > 0 ? this.removeFilter : null}
                        style={portion === 0 ? {cursor: 'no-drop'} : {cursor: 'pointer'}}>
                        <svg viewBox="4 4 16 16">
                          <path fill="rgb(115, 114, 108)" d={xPath}/>
                        </svg>
                      </TierX>
                      : null
                    }
                  </Tier>
                );
              })}
            </Tiers>
          </FeedbackStyle>
          <SearchControlsWrapper>
            <ReviewTitle>Reviews</ReviewTitle>
            <SearchControls>
              {this.props.totalReviews && this.props.totalReviews.length > 0 &&
              <Search
                totalReviews={this.props.totalReviews}
                currentTier={this.props.currentTier}
                setReviewsFilteredBySearch={this.props.setReviewsFilteredBySearch}
                setReviewsFilteredBySearchAndTier={this.props.setReviewsFilteredBySearchAndTier}
              />
              }
              <TierSelect className="tierSelect" ref={this.select} onChange={this.handleSelect}>
                <TierOption value="0">All ratings</TierOption>
                <TierOption value="5">Five stars</TierOption>
                <TierOption value="4">Four stars</TierOption>
                <TierOption value="3">Three stars</TierOption>
                <TierOption value="2">Two stars</TierOption>
                <TierOption value="1">One star</TierOption>
              </TierSelect>
            </SearchControls>
          </SearchControlsWrapper>
        </FeedbackWrapper>
      );
    }
  }
}



export default Feedback;