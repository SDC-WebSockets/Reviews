import React from 'react';
import Featured from './featured.jsx';
import Feedback from './feedback.jsx';
import ReviewList from './reviewList.jsx';


class ReviewService extends React.Component {
  constructor(props) {
    // console.log('Props in ReviewService:', props);
    super(props);
    this.state = {
      reviews: {},
      featuredReview: {},
    };
  }

  componentDidMount() {
    this.getReviews(this.props.courseId);
  }

  getReviews(id) {
    fetch(`http://localhost:2712/reviews/item?courseId=${id}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.updateReviews(data);
        this.chooseBestReview(data.reviews);
      });
  }

  updateReviews(reviews) {
    this.setState({reviews: reviews});
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
        <Feedback ratings={this.state.reviews.ratings}/>
        <ReviewList reviews={this.state.reviews.reviews}/>
      </div>
    );
  }
}

export default ReviewService;