import React from 'react';
import { ReviewGaugeStyle, ReviewBlackBar, ReviewGreyBar } from '../styles/gauge.style.js';

const Gauge = (props) => (
  <ReviewGaugeStyle style={{ display: 'grid'}}>
    <ReviewBlackBar style={{ width: `${(props.portion / 100) * 280}px`}}></ReviewBlackBar>
    <ReviewGreyBar/>
  </ReviewGaugeStyle>
);


export default Gauge;