import React from 'react';
import moment from 'moment';

// note for later: if a comment is more than 5 lines long, hide the rest use a 'Show more' button

const Review = (props) => {
  // console.log('Props in Review:', props);

  const CommentWithBoldSearchTerm = () => {
    // subcomponent: current search term should be bold in each filtered review (for now, only works for the first occurrence of that word in each review)

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
        {!props.review.reviewer.picture ? <div>{props.review.reviewer.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</div> : <img src={props.review.reviewer.picture}></img>}
      </div>
      <div>{props.review.reviewer.name}</div>
      <div>{props.review.rating}</div>
      <div>{moment(props.review.createdAt).fromNow()}</div>
      <div>{props.currentSearchTerm ? <CommentWithBoldSearchTerm/> : props.review.comment}</div>
      <p>Was this review helpful?</p>
      <button className="thumbs-up">[thumbs-up]</button>
      <button className="thumbs-down">[thumbs-down]</button>
      <button className="report">Report</button>
    </div>
  );
};

export default Review;