import React from 'react';
import { starPath } from '../svg.js';
import { StarSVG, StarsWrapper, Star } from '../styles/stars.style.js';

const makeStar = (starFill) => { // takes in 0, 0.5, or 1 as argument
  if (starFill === 0) {
    return (
      <StarSVG viewBox="0 0 24 24" fill='rgb(255, 255, 255)'>
        <path d={starPath} strokeWidth="2" stroke="rgb(235, 138, 47)"/>
      </StarSVG>
    );
  } else if (starFill === 0.5) {
    return (
      <StarSVG viewBox="2.2 2.2 19.8 19.8">
        {/* <defs>
          <linearGradient id="starGradient">
            <stop offset="50%" stopColor="rgb(235, 138, 47)"/>
            <stop offset="50%" stopColor="rgb(255, 255, 255)"/>
          </linearGradient>
        </defs> */}
        <path d='M 22 9.24 L 14.81 8.62 L 12 2 L 9.19 8.63 L 2 9.24 L 7.46 13.97 L 5.82 21 L 12 17.27 L 18.18 21 L 16.55 13.97 L 22 9.24 Z M 12 15.4 L 12 6.1 L 13.71 10.14 L 18.09 10.52 L 14.77 13.4 L 15.77 17.68 L 12 15.4 Z' strokeWidth="0.1" stroke="rgb(235, 138, 47)" fill='rgb(235, 138, 47)'/>
      </StarSVG>
    );
  } else if (starFill === 1) {
    return (
      <StarSVG viewBox="0 0 24 24" fill='rgb(235, 138, 47)'>
        <path d={starPath} strokeWidth="2" stroke="rgb(235, 138, 47)"/>
      </StarSVG>
    );
  }
};

const Stars = (props) => {
  const rating = Number(props.rating);
  const emptyStar = makeStar(0);
  const halfStar = makeStar(0.5);
  const fullStar = makeStar(1);
  let stars;
  if (rating >= 4.8) {
    stars = [fullStar, fullStar, fullStar, fullStar, fullStar];
  } else if (4.3 <= rating && rating <= 4.7) {
    stars = [fullStar, fullStar, fullStar, fullStar, halfStar];
  } else if (3.8 <= rating && rating <= 4.2) {
    stars = [fullStar, fullStar, fullStar, fullStar, emptyStar];
  } else if (3.3 <= rating && rating <= 3.7) {
    stars = [fullStar, fullStar, fullStar, halfStar, emptyStar];
  } else if (2.8 <= rating && rating <= 3.2) {
    stars = [fullStar, fullStar, fullStar, emptyStar, emptyStar];
  } else if (2.3 <= rating && rating <= 2.7) {
    stars = [fullStar, fullStar, halfStar, emptyStar, emptyStar];
  } else if (1.8 <= rating && rating <= 2.2) {
    stars = [fullStar, fullStar, emptyStar, emptyStar, emptyStar];
  } else if (1.3 <= rating && rating <= 1.7) {
    stars = [fullStar, halfStar, emptyStar, emptyStar, emptyStar];
  } else if (rating <= 1.2) {
    stars = [fullStar, emptyStar, emptyStar, emptyStar, emptyStar];
  }
  return (
    <StarsWrapper>
      {stars ? stars.map((star, index) => {
        const StarMemo = React.memo(
          () => <Star key={index}>{star}</Star>
        );
        return <StarMemo key={index}/>;
      }) : null}
    </StarsWrapper>
  );
};

export default Stars;