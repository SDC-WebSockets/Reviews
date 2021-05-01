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

  getReviews(id = 1) {
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
        this.chooseBestReview(this.state.currentCourse.reviews);
      });
  }

  chooseBestReview(reviews) {
    if (reviews) {
      let bestReview = reviews[0];
      let tiedBest = [reviews[0]];
      for (let i = 1; i < reviews.length; i++) {
        if (reviews[i].rating > bestReview.rating) {
          bestReview = reviews[i];
          tiedBest = [reviews[i]];
        } else if (reviews[i].rating === bestReview.rating) {
          tiedBest.push(reviews[i]);
        }
      }
      if (tiedBest.length > 1) {
        bestReview = tiedBest[0];
        for (let j = 1; j < tiedBest.length; j++) {
          if (tiedBest[j].comment.length > bestReview.comment.length) {
            bestReview = tiedBest[j];
          }
        }
      }
      this.setState({featuredReview: bestReview});
    }
  }


  render() {
    return (
      <div>
        <Featured review={this.state.featuredReview}/>
        <Feedback ratings={this.state.currentCourse.ratings}/>
        <ReviewList reviews={this.state.currentCourse.reviews}/>
      </div>
    );
  }
}

export default ReviewService;