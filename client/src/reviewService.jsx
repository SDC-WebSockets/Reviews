import React from 'react';
import Featured from './components/featured.jsx';
import Feedback from './components/feedback.jsx';
import ReviewList from './components/reviewList.jsx';


class ReviewService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCourse: {},
      featuredReview: {}
    };
  }

  componentDidMount() {
    this.getReviews();
  }

  getReviews() {
    let id = 5; // this.state.currentCourse.courseId
    fetch(`http://localhost:2712/reviews/item?id=${id}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({currentCourse: data});
      });
  }


  render() {
    return (
      <div>
        <Featured bestReview={this.state.featuredReview}/>
        <Feedback ratings={this.state.currentCourse.ratings}/>
        <ReviewList reviews={this.state.currentCourse.reviews}/>
      </div>
    );
  }
}

export default ReviewService;