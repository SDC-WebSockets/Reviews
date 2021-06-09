import React from 'react';
import { starPath } from '../svg.js';
import { StarStyle, StarsStyle, Star } from '../styles/stars.style.js';

const makeStar = (starFill) => {
  starFill = starFill * 2;
  const empty = 'rgb(255, 255, 255)';
  const half = 'url(#starGradient)';
  const full = 'rgb(235, 138, 47)';
  const starTypes = [empty, half, full];
  return (
    <StarStyle viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeWidth="2px" stroke="rgb(235, 138, 47)" fill={starTypes[starFill]} >
      <defs>
        <linearGradient id="starGradient">
          <stop offset="50%" stopColor="rgb(235, 138, 47)"/>
          <stop offset="50%" stopColor="rgb(255, 255, 255)"/>
        </linearGradient>
      </defs>
      <path d='M 12 17.27 L 18.18 21 l -1.64 -7.03 L 22 9.24 l -7.19 -0.61 L 12 2 L 9.19 8.63 L 2 9.24 l 5.46 4.73 L 5.82 21 L 12 17.27 Z' />
    </StarStyle>
  );
};

const Stars = (props) => {
  const rating = Number(props.rating).toFixed(1);
  let stars;
  if (rating >= 4.8) {
    stars = [makeStar(1), makeStar(1), makeStar(1), makeStar(1), makeStar(1)];
  } else if (4.3 <= rating && rating <= 4.7) {
    stars = [makeStar(1), makeStar(1), makeStar(1), makeStar(1), makeStar(0.5)];
  } else if (3.8 <= rating && rating <= 4.2) {
    stars = [makeStar(1), makeStar(1), makeStar(1), makeStar(1), makeStar(0)];
  } else if (3.3 <= rating && rating <= 3.7) {
    stars = [makeStar(1), makeStar(1), makeStar(1), makeStar(0.5), makeStar(0)];
  } else if (2.8 <= rating && rating <= 3.2) {
    stars = [makeStar(1), makeStar(1), makeStar(1), makeStar(0), makeStar(0)];
  } else if (2.3 <= rating && rating <= 2.7) {
    stars = [makeStar(1), makeStar(1), makeStar(0.5), makeStar(0), makeStar(0)];
  } else if (1.8 <= rating && rating <= 2.2) {
    stars = [makeStar(1), makeStar(1), makeStar(0), makeStar(0), makeStar(0)];
  } else if (1.3 <= rating && rating <= 1.7) {
    stars = [makeStar(1), makeStar(0.5), makeStar(0), makeStar(0), makeStar(0)];
  } else if (rating <= 1.2) {
    stars = [makeStar(1), makeStar(0), makeStar(0), makeStar(0), makeStar(0)];
  }
  return (
    <StarsStyle>
      {stars.map((star, index) => <Star key={index}>{star}</Star>)}
    </StarsStyle>
  );
};

export default Stars;