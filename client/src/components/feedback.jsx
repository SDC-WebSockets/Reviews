import React from 'react';

const Feedback = (props) => {
  // console.log('Props in Feedback:', props);
  if (props.ratings === undefined) {
    return null;
  } else if (props.ratings.totalRatings === 0) {
    return (
      <div>
        <h2>Student feedback</h2>
        <div>This course does not have any ratings yet.</div>
      </div>
    );
  } else {
    const getPercentage = (tier1 = 0, tier2 = 0) => {
      let percentage = (tier1 + tier2) / props.ratings.totalRatings * 100;
      if (0 < percentage && percentage < 1) {
        return '< 1%';
      }
      return Math.round(percentage) + '%';
    };
    // if a percentage is 0%, render it gray
    return (
      <div>
        <h2>Student feedback</h2>
        <div>{props.ratings.overallRating.toFixed(1)} Course Rating</div> {/* average of all ratings */}
        <div>5 stars: {getPercentage(props.ratings['5'])}</div>
        <div>4 stars: {getPercentage(props.ratings['4 1/2'], props.ratings['4'])}</div>
        <div>3 stars: {getPercentage(props.ratings['3 1/2'], props.ratings['3'])}</div>
        <div>2 stars: {getPercentage(props.ratings['2 1/2'], props.ratings['2'])}</div>
        <div>1 star: {getPercentage(props.ratings['1 1/2'], props.ratings['1'])}</div>
      </div>
    );
  }
};

export default Feedback;