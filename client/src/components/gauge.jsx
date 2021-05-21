import React from 'react';
import { BlackBar, GreyBar } from '../styles.js';

const Gauge = (props) => {
  const portion = Number(props.percentage.slice(0, props.percentage.length - 1));
  console.log(portion);
  return (
    <div style={{ display: 'grid'}}>
      <BlackBar style={{ width: `${(portion / 100) * 280}px`}}></BlackBar>
      <GreyBar/>
    </div>

  );
};
// {/* <BlackBar  */}
// {/* <GreyBar/> */}

export default Gauge;