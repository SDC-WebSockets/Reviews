import React from 'react';
import { GaugeStyle, BlackBar, GreyBar } from '../styles/gauge.style.js';

const Gauge = (props) => {
  return (
    <GaugeStyle>
      <BlackBar style={{ width: `${(props.portion)}%`}}></BlackBar>
      <GreyBar/>
    </GaugeStyle>
  );
};


export default Gauge;