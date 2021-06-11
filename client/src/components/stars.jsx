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
      <StarSVG viewBox="0 0 24 24">
        <defs>
          <linearGradient id="starGradient">
            <stop offset="50%" stopColor="rgb(235, 138, 47)"/>
            <stop offset="50%" stopColor="rgb(255, 255, 255)"/>
          </linearGradient>
        </defs>
        <path d={starPath} strokeWidth="2" stroke="rgb(235, 138, 47)" fill='url(#starGradient)'/>
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