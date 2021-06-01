import React from 'react';
import moment from 'moment';
import Stars from './stars.jsx';
import { ReviewRatingStyle, ReviewMoment } from '../styles/rating.style.js';

const Rating = (props) => (
  <ReviewRatingStyle>
    <Stars className="reviewRating" rating={props.rating}/>
    <ReviewMoment className="reviewDate">
      {moment(props.createdAt).fromNow()}
    </ReviewMoment>
  </ReviewRatingStyle>
);

export default Rating;