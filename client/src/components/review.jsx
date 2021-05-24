import React from 'react';
import Rating from './rating.jsx';
import Comment from './comment.jsx';
import Buttons from './buttons.jsx';
import {
  ReviewStyle,
  ReviewerAvatar,
  ReviewerInitials,
  ReviewerPicture,
  ReviewContent,
  Name
} from '../styles/review.style.js';
import {
  gradientStyle,
  defaultStyle
} from '../styles/comment.style.js';

// note for later: if a comment is more than 5 lines long, hide the rest use a 'Show more' button

class Review extends React.Component {
  constructor(props) {
    // console.log('Props in Review:', props);
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      thumbsUp: false,
      thumbsDown: false,
      reported: false,
      commentHeight: '100px',
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
        currentComment.style = defaultStyle;
      } else {
        this.setState({ commentHeight: '100px' });
        currentComment.style = gradientStyle;
      }
    }
  }

  render () {
    return (
      <ReviewStyle
        style={this.props.reviewNumber === this.props.displayedReviews.length ? {borderBottomWidth: '0'} : null}>
        <ReviewerAvatar className="reviewerAvatar">
          {/* if the reviewer has no avatar, the default avatar consists of a saved color background and the reviewer's initials */}
          {this.props.review.reviewer.picture.slice(0, 3) === 'rgb' ?
            <ReviewerInitials className="reviewerInitials" style={{backgroundColor: this.props.review.reviewer.picture}}>{this.props.review.reviewer.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</ReviewerInitials> :
            <ReviewerPicture className="reviewerPicture" src={this.props.review.reviewer.picture}/>}
        </ReviewerAvatar>
        <ReviewContent>
          <Name className="reviewerName" style={this.state.reported ? {color: 'rgb(210, 0, 0)'} : null}>
            {this.state.reported ?
              this.props.review.reviewer.name + ' USER REPORTED' :
              this.props.review.reviewer.name}
          </Name>
          <Rating rating={this.props.review.rating} createdAt={this.props.review.createdAt}/>
          <Comment review={this.props.review} currentSearchTerm={this.props.currentSearchTerm} commentHeight={this.state.commentHeight} handleClick={this.handleClick}/>
          <Buttons reviewState={this.state} handleClick={this.handleClick}/>
        </ReviewContent>
      </ReviewStyle>
    );
  }
}

export default Review;