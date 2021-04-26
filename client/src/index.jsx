import React from 'react';
import ReactDOM from 'react-dom';

import Featured from './components/featured.jsx';
import Feedback from './components/feedback.jsx';
import ReviewList from './components/reviewList.jsx';


class ReviewService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      featuredReview: {}
    }
  }


  render() {
    return (
      <div>
        <Featured />
        <Feedback />
        <ReviewList />
      </div>
    )
  }
}




ReactDOM.render(<ReviewService />, document.getElementById('review-service'));