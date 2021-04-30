import React from 'react';
import Review from './review.jsx';
import moment from 'moment';

const Featured = (props) => {
  // console.log('Props in Featured:', props);
  if (!props.review || !props.review.reviewer) {
    return null;
  } else {
    return (
      <div>
        <h2>Featured review</h2>
        <div>
          {props.review.reviewer.picture.length === 2 ? <div>{props.review.reviewer.picture}</div> : <img src={props.review.reviewer.picture}></img>}
        </div>
        <div>{props.review.reviewer.name}</div>
        <div>{props.review.reviewer.coursesTaken} courses</div>
        <div>{props.review.reviewer.reviews} reviews</div>
        <div>{props.review.rating}</div>
        <div>{moment(props.review.createdAt).fromNow()}</div>
        <div>{props.review.comment}</div>
        <p>Was this review helpful?</p>
        <button className="thumbs-up">[thumbs-up]</button>
        <button className="thumbs-down">[thumbs-down]</button>
        <button className="report">Report</button>
      </div>
    );
  }
};

export default Featured;