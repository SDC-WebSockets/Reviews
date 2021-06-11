import React from 'react';
import moment from 'moment';
import Stars from './stars.jsx';
import { RatingWrapper, ReviewMoment } from '../styles/rating.style.js';

const Rating = (props) => (
  <RatingWrapper>
    <Stars className="reviewRating" rating={props.rating}/>
    {props.createdAt &&
      <ReviewMoment className="reviewDate">
        {moment(props.createdAt).fromNow()}
      </ReviewMoment>
    }
  </RatingWrapper>
);


export default Rating;