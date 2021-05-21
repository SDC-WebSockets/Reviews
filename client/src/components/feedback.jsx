import React from 'react';
import Search from './search.jsx';
import Stars from './stars.jsx';

import {
  Title,
  FeedbackStyle,
  OverallRating,
  Grade,
  Tiers,
  Tier,
  TierX,
  ReviewControls,
  TierSelect
} from '../styles.js';

class Feedback extends React.Component {
  constructor(props) {
    // console.log('Props in Feedback:', props);
    super(props);
    this.filterByTier = this.filterByTier.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
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
    this.filterByTier(tier);
    this.select.current.value = tier.toString();
  }

  handleSelect(e) {
    this.filterByTier(Number(e.target.value));
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
  }

  // TO DO
  // if a percentage is 0%, render it gray and unclickable
  render() {
    if (this.props.ratings.totalRatings === 0) {
      return (
        <div>
          <h2>Student feedback</h2>
          <div>This course doesn't have any ratings yet.</div>
        </div>
      );
    } else {
      const tiers = [
        ['5'], ['4 1/2', '4'], ['3 1/2', '3'], ['2 1/2', '2'], ['1 1/2', '1']
      ];
      return (
        <div>
          <Title>Student feedback</Title>
          <FeedbackStyle>
            <OverallRating>
              <Grade>{this.props.ratings.overallRating.toFixed(1)}
              </Grade>
              <div>
                <Stars rating={this.props.ratings.overallRating}/>
              </div>
              <div>Course Rating</div>
            </OverallRating>
            <Tiers>
              {tiers.map((tier) => {
                let percentage;
                tier.length === 1 ?
                  percentage = this.getPercentage(this.props.ratings[tier[0]]) :
                  percentage = this.getPercentage(this.props.ratings[tier[0]], this.props.ratings[tier[1]]);
                return (
                  <Tier key={tier[tier.length - 1]} >
                    <div onClick={() => percentage === '0%' ? null : this.handleClick(Number(tier[tier.length - 1]))}>
                      <Stars rating={tier[tier.length - 1]}/>
                      <div>{percentage}</div>
                    </div>
                    <div>
                      {this.props.currentTier === Number(tier[tier.length - 1]) ? <TierX onClick={this.removeFilter}>
                        <span dangerouslySetInnerHTML={{ __html: x }}></span>
                      </TierX> : null}
                    </div>
                  </Tier>
                );
              })}
            </Tiers>
          </FeedbackStyle>
          <div>

            <Title>Reviews</Title>
            <ReviewControls>
              {this.props.totalReviews && this.props.totalReviews.length > 0 &&
              <Search
                totalReviews={this.props.totalReviews}
                currentTier={this.props.currentTier}
                setReviewsFilteredBySearch={this.props.setReviewsFilteredBySearch}
                setReviewsFilteredBySearchAndTier={this.props.setReviewsFilteredBySearchAndTier}
              />
              }
              <TierSelect className="tierSelect" ref={this.select} onChange={this.handleSelect}>
                <option value="0">All ratings</option>
                <option value="5">Five stars</option>
                <option value="4">Four stars</option>
                <option value="3">Three stars</option>
                <option value="2">Two stars</option>
                <option value="1">One star</option>
              </TierSelect>
            </ReviewControls>
          </div>
        </div>
      );
    }
  }
}



export default Feedback;