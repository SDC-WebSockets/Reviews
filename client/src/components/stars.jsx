import React from 'react';
import { fullStar, halfStar, emptyStar, x } from '../svg.js';
import { StarsStyle, StarStyle } from '../styles.js';

const star = (starFill) => {
  const empty = 'rgb(255, 255, 255)';
  const half = 'url(#gradient)';
  const full = 'rgb(235, 138, 47)';
  const starTypes = [empty, half, full];
  return (
    <svg viewBox="0 0 24 24" width="20" height="20">
      <defs>
        <linearGradient id="gradient">
          <stop offset="50%" stopColor="rgb(235, 138, 47)"/>
          <stop offset="50%" stopColor="rgb(255, 255, 255)" stopOpacity="1"/>
        </linearGradient>
      </defs>
      <path d="M 12 17.27 L 18.18 21 l -1.64 -7.03 L 22 9.24 l -7.19 -0.61 L 12 2 L 9.19 8.63 L 2 9.24 l 5.46 4.73 L 5.82 21 L 12 17.27 Z" strokeWidth="1" stroke="rgb(235, 138, 47)" fill={starTypes[Math.floor(starFill * 2)]}></path>
    </svg>
  );
};

const Stars = (props) => {
  // console.log('Props in Stars:', props);
  const rating = Number(props.rating).toFixed(1);
  let stars;
  if (rating >= 4.8) {
    stars = [star(1), star(1), star(1), star(1), star(1)];
  } else if (4.3 <= rating && rating <= 4.7) {
    stars = [star(1), star(1), star(1), star(1), star(0.5)];
  } else if (3.8 <= rating && rating <= 4.2) {
    stars = [star(1), star(1), star(1), star(1), star(0)];
  } else if (3.3 <= rating && rating <= 3.7) {
    stars = [star(1), star(1), star(1), star(0.5), star(0)];
  } else if (2.8 <= rating && rating <= 3.2) {
    stars = [star(1), star(1), star(1), star(0), star(0)];
  } else if (2.3 <= rating && rating <= 2.7) {
    stars = [star(1), star(1), star(0.5), star(0), star(0)];
  } else if (1.8 <= rating && rating <= 2.2) {
    stars = [star(1), star(1), star(0), star(0), star(0)];
  } else if (1.3 <= rating && rating <= 1.7) {
    stars = [star(1), star(0.5), star(0), star(0), star(0)];
  } else if (rating <= 1.2) {
    stars = [star(1), star(0), star(0), star(0), star(0)];
  }
  return (
    <StarsStyle>
      {stars.map((star, index) => <StarStyle key={index}>{star}</StarStyle>)}
    </StarsStyle>
  );
};

export default Stars;