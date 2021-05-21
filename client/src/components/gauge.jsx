import React from 'react';
import { BlackBar, GreyBar } from '../styles.js';

const Gauge = (props) => (
  <div style={{ display: 'grid'}}>
    <BlackBar style={{ width: `${(props.portion / 100) * 280}px`}}></BlackBar>
    <GreyBar/>
  </div>
);


export default Gauge;