import React from 'react';
import moment from 'moment';

import {
  ReviewStyle,
  ReviewerAvatar,
  ReviewerInitials,
  ReviewerPicture,
  ReviewContent,
  Name,
  Rating,
  Moment,
  Comment,
  Helpful,
  Report
} from '../styles.js';

// note for later: if a comment is more than 5 lines long, hide the rest use a 'Show more' button

const Review = (props) => {
  // console.log('Props in Review:', props);
  const CommentWithBoldSearchTerm = () => {
    let comment = props.review.comment;
    let searchTerm = props.currentSearchTerm;
    const boldString = (string, term) => {
      let regExp = new RegExp ('(' + term + ')', 'gi');
      return string.replaceAll(regExp, '<strong>$1</strong>');
    };
    let newComment = boldString(comment, searchTerm);

    return (
      <div className="commentWithBoldSearchTerm" dangerouslySetInnerHTML={{ __html: newComment}}></div>
    );
  };

  return (
    <ReviewStyle>
      <ReviewerAvatar className="reviewerAvatar">
        {/* if the reviewer has no avatar, the default avatar consists of a saved color background and the reviewer's initials */}
        {props.review.reviewer.picture.slice(0, 3) === 'rgb' ?
          <ReviewerInitials className="reviewerInitials" style={{backgroundColor: props.review.reviewer.picture}}>{props.review.reviewer.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</ReviewerInitials> :
          <ReviewerPicture className="reviewerPicture" src={props.review.reviewer.picture}/>}
      </ReviewerAvatar>
      <ReviewContent>
        <Name className="reviewerName">{props.review.reviewer.name}</Name>
        <Rating>
          <div className="reviewRating">{props.review.rating}</div>
          <Moment className="reviewDate">{moment(props.review.createdAt).fromNow()}</Moment>
        </Rating>
        <Comment>
          <div className="reviewComment">{props.currentSearchTerm ? <CommentWithBoldSearchTerm/> : props.review.comment}</div>
          <Helpful>Was this review helpful?</Helpful>
          <button className="thumbs-up">[thumbs-up]</button>
          <button className="thumbs-down">[thumbs-down]</button>
          <Report>Report</Report>
        </Comment>
      </ReviewContent>
    </ReviewStyle>
  );
};

export default Review;