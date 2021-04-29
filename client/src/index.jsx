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
    };
  }

  componentDidMount() {
    fetch('http://localhost:2712/reviews', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log(data));
  }


  render() {
    return (
      <div>
        <Featured />
        <Feedback />
        <ReviewList />
      </div>
    );
  }
}




ReactDOM.render(<ReviewService />, document.getElementById('review-service'));