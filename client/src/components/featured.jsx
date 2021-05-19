import React from 'react';
import Review from './review.jsx';
import moment from 'moment';

import { Title, Initials, Avatar, ReviewerName, Report } from '../styles.js';

const Featured = (props) => (
  <div>
    {/* {console.log('Props in Featured:', props)} */}
    {props.review && props.review.reviewer &&
      <div>
        <Title>Featured review</Title>
        <div className="reviewerAvatar">
          {/* if the reviewer has no avatar, the default avatar consists of reviewer's initials */}
          {props.review.reviewer.picture === null ?
            <Initials>{props.review.reviewer.name.split(' ').map((n)=>n[0]).join('').slice(0, 2)}</Initials> :
            <Avatar src={props.review.reviewer.picture}/>}
        </div>
        <ReviewerName className="reviewerName">{props.review.reviewer.name}</ReviewerName>
        <div className="reviewerCoursesTaken">{props.review.reviewer.coursesTaken} {props.review.reviewer.reviews === 1 ? 'course' : 'courses'}</div>
        <div className="reviewerReviews">{props.review.reviewer.reviews} {props.review.reviewer.reviews === 1 ? 'review' : 'reviews'}</div>
        <div className="reviewRating">{props.review.rating}</div>
        <div className="reviewDate">{moment(props.review.createdAt).fromNow()}</div>
        <div className="reviewComment">{props.review.comment}</div>
        <p>Was this review helpful?</p>

        <button className="thumbs-up" value="yes">
          {/* <svg data-purpose="icon" aria-label="Mark as helpful" focusable="false" class="udlite-icon udlite-icon-small helpful-button--icon--2CtKB">
            <use xlink:href="#icon-thumb-up"> */}
          {/* <svg id="icon-thumb-up" viewBox="0 0 24 24"> */}

          {/* <path d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1V9z">
            </path> */}
          {/* </svg> */}
          {/* </use>
          </svg> */}
        </button>

        <button className="thumbs-down" value="no">[thumbs-down]</button>
        <Report className="report">Report</Report>
      </div>
    }
  </div>
);

export default Featured;