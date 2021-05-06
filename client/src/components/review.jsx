import React from 'react';
import moment from 'moment';

const Review = (props) => { // if a comment is more than 5 lines long, use the 'Show more' button
  // console.log('Props in Review:', props);
  const CommentWithBoldSearchTerm = () => {
    let comment = props.review.comment;
    let term = props.currentSearchTerm;
    let occurrenceIndex = comment.toLowerCase().indexOf(term);
    let isCapitalized = comment.charAt(occurrenceIndex) === comment.charAt(occurrenceIndex).toUpperCase();
    isCapitalized ? term = term[0].toUpperCase() + term.slice(1) : term;

    return (
      <div>
        {comment.slice(0, occurrenceIndex)}<strong>{term}</strong>{comment.slice(occurrenceIndex + term.length)}
      </div>
    );

  };
  return (
    <div>
      <div>
        {/* if the reviewer has no avatar, the default avatar consists of reviewer's initials */}
        {props.review.reviewer.picture === null ? <div>{props.review.reviewer.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</div> : <img src={props.review.reviewer.picture}></img>}
      </div>
      <div>{props.review.reviewer.name}</div>
      <div>{props.review.rating}</div>
      <div>{moment(props.review.createdAt).fromNow()}</div>
      <div>{props.currentSearchTerm !== null ? <CommentWithBoldSearchTerm/> : props.review.comment}</div>
      <p>Was this review helpful?</p>
      <button className="thumbs-up">[thumbs-up]</button>
      <button className="thumbs-down">[thumbs-down]</button>
      <button className="report">Report</button>
    </div>
  );
};

export default Review;