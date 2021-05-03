import React from 'react';
import moment from 'moment';

const Review = (props) => ( // if a comment is more than 5 lines long, use the 'Show more' button
  <div>
    {/* {console.log('Props in Review:', props)} */}
    <div>
      {/* if the reviewer has no avatar, the default avatar consists of reviewer's initials */}
      {props.review.reviewer.picture === null ? <div>{props.review.reviewer.name.split(' ').map((n)=>n[0]).join('').slice(0, 2)}</div> : <img src={props.review.reviewer.picture}></img>}
    </div>
    <div>{props.review.reviewer.name}</div>
    <div>{props.review.rating}</div>
    <div>{moment(props.review.createdAt).fromNow()}</div>
    <div>{props.review.comment}</div>
    <p>Was this review helpful?</p>
    <button className="thumbs-up">[thumbs-up]</button>
    <button className="thumbs-down">[thumbs-down]</button>
    <button className="report">Report</button>
  </div>
);

export default Review;