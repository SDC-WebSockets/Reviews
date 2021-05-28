import React from 'react';
import moment from 'moment';
import Stars from './stars.jsx';
import { RatingStyle, Moment } from '../styles/rating.style.js';

const Rating = (props) => (
  <RatingStyle>
    <Stars className="reviewRating" rating={props.rating}/>
    <Moment className="reviewDate">
      {moment(props.createdAt).fromNow()}
    </Moment>
  </RatingStyle>
);

export default Rating;