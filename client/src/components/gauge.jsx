import React from 'react';
import { GaugeWrapper, BlackBar, GreyBar } from '../styles/gauge.style.js';

const Gauge = (props) => {
  return (
    <GaugeWrapper>
      <BlackBar style={{ width: `${(props.portion)}%`}}></BlackBar>
      <GreyBar/>
    </GaugeWrapper>
  );
};


export default Gauge;