import React from 'react';
import moment from 'moment';
import Stars from './stars.jsx';
import { RatingStyle, ReviewMoment } from '../styles/rating.style.js';

const Rating = (props) => (
  <RatingStyle>
    <Stars className="reviewRating" rating={props.rating}/>
    {props.createdAt &&
      <ReviewMoment className="reviewDate">
        {moment(props.createdAt).fromNow()}
      </ReviewMoment>
    }
  </RatingStyle>
);


export default Rating;