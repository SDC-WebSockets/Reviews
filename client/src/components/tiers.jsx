import React from 'react';
import Stars from './stars.jsx';
import Gauge from './gauge.jsx';
import { xPath } from '../svg.js';
import {
  TiersWrapper,
  Tier,
  Data,
  Percentage,
  TierX,
} from '../styles/tiers.style.js';

class Tiers extends React.Component {
  constructor(props) {
    super(props);
    this.getPercentage = this.getPercentage.bind(this);
  }

  getPercentage(tier1 = 0, tier2 = 0) {
    let percentage = (tier1 + tier2) / this.props.ratings.totalRatings * 100;
    if (0 < percentage && percentage < 1) {
      return '< 1%';
    }
    return Math.round(percentage) + '%';
  }

  render() {
    const tiers = [
      ['5'], ['4 1/2', '4'], ['3 1/2', '3'], ['2 1/2', '2'], ['1 1/2', '1']
    ];
    return (
      <TiersWrapper>
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
                onClick={portion > 0 ? () => this.props.handleClick(Number(currentTier)) : null}
              >
                <Gauge portion={portion}/>
                <Stars rating={currentTier}/>
                <Percentage>{percentage}</Percentage>

                {this.props.currentTier === currentTier ?
                  <TierX style={{visibility: 'visible'}}
                    onClick={portion > 0 ? this.removeFilter : null}
                    style={portion === 0 ? {cursor: 'no-drop'} : {cursor: 'pointer'}}>
                    <svg viewBox="0 0 24 24" height="16px" width="16px">
                      <path fill="rgb(115, 114, 108)" d={xPath}/>
                    </svg>
                  </TierX>
                  : <TierX style={{visibility: 'hidden'}}/>
                }
              </Data>
            </Tier>
          );
        })}
      </TiersWrapper>
    );
  }
}

export default Tiers;