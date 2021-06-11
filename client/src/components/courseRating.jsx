import React from 'react';
import Rating from './rating.jsx';

import {
  OverallRating,
  CourseGrade,
  StarsWrapper,
  CourseRatingTitle
} from '../styles/courseRating.style.js';

class CourseRating extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.rating !== this.props.rating) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <OverallRating>
        <CourseGrade>{this.props.overallRating}
        </CourseGrade>
        <StarsWrapper>
          <Rating rating={Number(this.props.overallRating)}/>
        </StarsWrapper>
        <CourseRatingTitle>Course Rating</CourseRatingTitle>
      </OverallRating>
    );
  }
}

export default CourseRating;