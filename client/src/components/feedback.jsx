import React from 'react';

class Feedback extends React.Component {
  constructor(props) {
    // console.log('Props in Feedback:', props);
    super(props);
    this.removeFilter = this.removeFilter.bind(this);
    this.state = {
      tierClicked: null
    };
  }

  getPercentage(tier1 = 0, tier2 = 0) {
    let percentage = (tier1 + tier2) / this.props.ratings.totalRatings * 100;
    if (0 < percentage && percentage < 1) {
      return '< 1%';
    }
    return Math.round(percentage) + '%';
  }

  handleClick(tier) {
    this.props.setReviewsFilteredByTier(tier);
    this.setState({tierClicked: tier});
  }

  removeFilter() {
    this.props.setReviewsFilteredByTier('all');
    this.setState({tierClicked: null});
  }

  // if a percentage is 0%, render it gray
  render() {
    if (this.props.ratings.totalRatings === 0) {
      return (
        <div>
          <h2>Student feedback</h2>
          <div>This course does not have any ratings yet.</div>
        </div>
      );
    } else {
      return (
        <div>
          <h2>Student feedback</h2>
          <div>{this.props.ratings.overallRating.toFixed(1)} Course Rating</div>

          <div onClick={() => this.handleClick('5')}>
            5 stars: {this.getPercentage(this.props.ratings['5'])}</div>
          {this.state.tierClicked === '5' ? <button onClick={this.removeFilter}>X</button> : null}

          <div onClick={() => this.handleClick('4')}>
            4 stars: {this.getPercentage(this.props.ratings['4 1/2'], this.props.ratings['4'])}</div>
          {this.state.tierClicked === '4' ? <button onClick={this.removeFilter}>X</button> : null}

          <div onClick={() => this.handleClick('3')}>
            3 stars: {this.getPercentage(this.props.ratings['3 1/2'], this.props.ratings['3'])}</div>
          {this.state.tierClicked === '3' ? <button onClick={this.removeFilter}>X</button> : null}

          <div onClick={() => this.handleClick('2')}>
            2 stars: {this.getPercentage(this.props.ratings['2 1/2'], this.props.ratings['2'])}</div>
          {this.state.tierClicked === '2' ? <button onClick={this.removeFilter}>X</button> : null}

          <div onClick={() => this.handleClick('1')}>
            1 star: {this.getPercentage(this.props.ratings['1 1/2'], this.props.ratings['1'])}</div>
          {this.state.tierClicked === '1' ? <button onClick={this.removeFilter}>X</button> : null}

        </div>
      );
    }
  }
}



export default Feedback;