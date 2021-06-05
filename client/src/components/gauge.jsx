import React from 'react';
import { GaugeStyle, BlackBar, GreyBar } from '../styles/gauge.style.js';

const Gauge = (props) => (
  <GaugeStyle style={{ display: 'grid'}}>
    <BlackBar style={{ width: `${(props.portion / 100) * 280}px`}}></BlackBar>
    <GreyBar/>
  </GaugeStyle>
);


export default Gauge;