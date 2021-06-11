import React from 'react';
import Rating from './rating.jsx';
import Comment from './comment.jsx';
import Buttons from './buttons.jsx';
import { ReviewServiceWrapper, ReviewTitle } from '../styles/main.style.js';
import {
  FeaturedReviewWrapper,
  FeaturedReviewStyle,
  FeaturedReviewer,
  FeaturedReviewerAvatar,
  FeaturedReviewerInitials,
  FeaturedReviewerPicture,
  FeaturedReviewerMetadata,
  FeaturedReviewerCoursesTaken,
  FeaturedReviewerReviews
} from '../styles/featured.style.js';
import {
  reviewGradientStyle,
  reviewDefaultStyle
} from '../styles/comment.style.js';
import { ReviewerName } from '../styles/review.style.js';

class Featured extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      thumbsUp: false,
      thumbsDown: false,
      reported: false,
      commentHeight: '100px'
    };
  }

  handleClick (button) {
    if (button === 'thumbsUp') {
      this.state.thumbsUp === false ? this.setState({thumbsUp: true, thumbsDown: false}) : this.setState({ thumbsUp: false });
    }
    if (button === 'thumbsDown') {
      this.state.thumbsDown === false ? this.setState({ thumbsUp: false, thumbsDown: true }) : this.setState({ thumbsDown: false });
    }
    if (button === 'report') {
      this.state.reported === false ? this.setState({ reported: true }) : this.setState({ reported: false });
    }
    if (button === 'showMore') {
      let currentComment = document.getElementById(`commentId${this.props.review._id}`);
      if (this.state.commentHeight === '100px') {
        this.setState({ commentHeight: 'auto' });
        currentComment.style = reviewDefaultStyle;
      } else {
        this.setState({ commentHeight: '100px' });
        currentComment.style = reviewGradientStyle;
      }
    }
  }

  render() {
    return (
      <ReviewServiceWrapper>
        <FeaturedReviewWrapper>
          {this.props.review && this.props.review.reviewer &&
            <FeaturedReviewStyle>
              <ReviewTitle>Featured review</ReviewTitle>
              <FeaturedReviewer>
                <FeaturedReviewerAvatar className="featuredReviewerAvatar">
                  {/* if the reviewer has no avatar, the default avatar consists of a saved color background and the reviewer's initials */}
                  {this.props.review.reviewer.picture.slice(0, 3) === 'rgb' ?
                    <FeaturedReviewerInitials className="featuredReviewerInitials" style={{backgroundColor: this.props.review.reviewer.picture}}>{this.props.review.reviewer.name.split(' ').map((n)=>n[0]).join('').slice(0, 2)}</FeaturedReviewerInitials> :
                    <FeaturedReviewerPicture className="featuredReviewerPicture" src={this.props.review.reviewer.picture}/>}
                </FeaturedReviewerAvatar>
                <FeaturedReviewerMetadata className="featuredReviewerMetadata">
                  <ReviewerName className="reviewerName" style={this.state.reported ? {color: 'rgb(210, 0, 0)'} : null}>
                    {this.state.reported ?
                      this.props.review.reviewer.name + ' USER REPORTED' :
                      this.props.review.reviewer.name}
                  </ReviewerName>
                  <FeaturedReviewerCoursesTaken className="reviewerCoursesTaken">{this.props.review.reviewer.coursesTaken} {this.props.review.reviewer.reviews === 1 ? 'course' : 'courses'}</FeaturedReviewerCoursesTaken>
                  <FeaturedReviewerReviews className="reviewerReviews">{this.props.review.reviewer.reviews} {this.props.review.reviewer.reviews === 1 ? 'review' : 'reviews'}</FeaturedReviewerReviews>
                </FeaturedReviewerMetadata>
              </FeaturedReviewer>
              <Rating rating={this.props.review.rating} createdAt={this.props.review.createdAt}/>
              <Comment review={this.props.review} currentSearchTerm={this.props.currentSearchTerm} commentHeight={this.state.commentHeight} handleClick={this.handleClick}/>
              <Buttons reviewState={this.state} handleClick={this.handleClick}/>
            </FeaturedReviewStyle>
          }
        </FeaturedReviewWrapper>
      </ReviewServiceWrapper>
    );
  }
}

export default Featured;