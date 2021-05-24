import React from 'react';
import Rating from './rating.jsx';
import Comment from './comment.jsx';
import Buttons from './buttons.jsx';
import { Title } from '../styles/main.style.js';
import {
  FeaturedStyle,
  FeaturedReviewer,
  FeaturedReviewerAvatar,
  FeaturedReviewerInitials,
  FeaturedReviewerPicture,
  FeaturedReviewerMetadata
} from '../styles/featured.style.js';
import {Name} from '../styles/review.style.js';

class Featured extends React.Component {
  constructor(props) {
    // console.log('Props in Featured:', props);
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      thumbsUp: false,
      thumbsDown: false,
      reported: false,
      wholeView: false
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
      this.state.wholeView === false ? this.setState({ wholeView: true }) : this.setState({ wholeView: false });
    }
  }

  render() {
    return (
      <div>
        {this.props.review && this.props.review.reviewer &&
          <FeaturedStyle>
            <Title>Featured review</Title>
            <FeaturedReviewer>
              <FeaturedReviewerAvatar className="featuredReviewerAvatar">
                {/* if the reviewer has no avatar, the default avatar consists of a saved color background and the reviewer's initials */}
                {this.props.review.reviewer.picture.slice(0, 3) === 'rgb' ?
                  <FeaturedReviewerInitials className="featuredReviewerInitials" style={{backgroundColor: this.props.review.reviewer.picture}}>{this.props.review.reviewer.name.split(' ').map((n)=>n[0]).join('').slice(0, 2)}</FeaturedReviewerInitials> :
                  <FeaturedReviewerPicture className="featuredReviewerPicture" src={this.props.review.reviewer.picture}/>}
              </FeaturedReviewerAvatar>
              <FeaturedReviewerMetadata className="featuredReviewerMetadata">
                <Name className="reviewerName">{this.props.review.reviewer.name}</Name>
                <div className="reviewerCoursesTaken">{this.props.review.reviewer.coursesTaken} {this.props.review.reviewer.reviews === 1 ? 'course' : 'courses'}</div>
                <div className="reviewerReviews">{this.props.review.reviewer.reviews} {this.props.review.reviewer.reviews === 1 ? 'review' : 'reviews'}</div>
              </FeaturedReviewerMetadata>
            </FeaturedReviewer>
            <Rating rating={this.props.review.rating} createdAt={this.props.review.createdAt}/>
            <Comment review={this.props.review} currentSearchTerm={this.props.currentSearchTerm} wholeView={this.state.wholeView} handleClick={this.handleClick}/>
            <Buttons reviewState={this.state} handleClick={this.handleClick}/>
          </FeaturedStyle>
        }
      </div>
    );
  }
}

export default Featured;