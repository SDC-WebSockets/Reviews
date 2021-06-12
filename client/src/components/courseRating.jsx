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
        <CourseGrade>
          {Number.isInteger(this.props.overallRating) ? this.props.overallRating.toString() + '.0' : this.props.overallRating}
        </CourseGrade>
        <Rating rating={this.props.overallRating}/>
        <CourseRatingTitle>Course Rating</CourseRatingTitle>
      </OverallRating>
    );
  }
}

export const MemoizedCourseRating = React.memo(CourseRating);