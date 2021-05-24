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

// note for later: if a comment is more than 5 lines long, hide the rest use a 'Show more' button

const Review = (props) => {
  // console.log('Props in Review:', props);
  return (
    <ReviewStyle
      style={props.reviewNumber === props.displayedReviews.length ? {borderBottomWidth: '0'} : null}>
      <ReviewerAvatar className="reviewerAvatar">
        {/* if the reviewer has no avatar, the default avatar consists of a saved color background and the reviewer's initials */}
        {props.review.reviewer.picture.slice(0, 3) === 'rgb' ?
          <ReviewerInitials className="reviewerInitials" style={{backgroundColor: props.review.reviewer.picture}}>{props.review.reviewer.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</ReviewerInitials> :
          <ReviewerPicture className="reviewerPicture" src={props.review.reviewer.picture}/>}
      </ReviewerAvatar>
      <ReviewContent>
        <Name className="reviewerName">{props.review.reviewer.name}</Name>
        <Rating rating={props.review.rating} createdAt={props.review.createdAt}/>
        <Comment review={props.review} currentSearchTerm={props.currentSearchTerm}/>
        <Buttons/>
      </ReviewContent>
    </ReviewStyle>
  );
};

export default Review;