import React from 'react';
import moment from 'moment';

import { ReviewStyle, ReviewerName, Initials, Avatar, Report} from '../styles.js';

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
      <div className="reviewerAvatar">
        {/* if the reviewer has no avatar, the default avatar consists of reviewer's initials */}
        {!props.review.reviewer.picture ?
          <Initials>{props.review.reviewer.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</Initials> :
          <Avatar src={props.review.reviewer.picture}/>}
      </div>
      <ReviewerName className="reviewerName">{props.review.reviewer.name}</ReviewerName>
      <div className="reviewRating">{props.review.rating}</div>
      <div className="reviewDate">{moment(props.review.createdAt).fromNow()}</div>
      <div className="reviewComment">{props.currentSearchTerm ? <CommentWithBoldSearchTerm/> : props.review.comment}</div>
      <p>Was this review helpful?</p>
      <button className="thumbs-up">[thumbs-up]</button>
      <button className="thumbs-down">[thumbs-down]</button>
      <Report className="report">Report</Report>
    </ReviewStyle>
  );
};

export default Review;