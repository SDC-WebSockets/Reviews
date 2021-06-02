import React from 'react';
import { ReviewBlackBar, ReviewGreyBar } from '../styles/gauge.style.js';

const Gauge = (props) => (
  <div style={{ display: 'grid'}}>
    <ReviewBlackBar style={{ width: `${(props.portion / 100) * 280}px`}}></ReviewBlackBar>
    <ReviewGreyBar/>
  </div>
);


export default Gauge;