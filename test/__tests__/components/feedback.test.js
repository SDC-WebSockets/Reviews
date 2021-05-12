import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import { sampleDataForOneCourse } from '../../mockData/sampleDataForOneCourse.js';

import ReviewService from '../../../client/src/components/reviewService.jsx';
import Feedback from '../../../client/src/components/feedback.jsx';

describe ('Feedback component', () => {

  const reviewServiceWrapper = mount(<ReviewService courseId={9}/>);

  reviewServiceWrapper.setState({
    totalReviews: sampleDataForOneCourse.reviews,
    ratings: sampleDataForOneCourse.ratings
  });

  const instance = reviewServiceWrapper.instance();

  const feedbackWrapper = mount(<Feedback ratings={instance.state.ratings} setReviewsFilteredByTier={instance.setReviewsFilteredByTier}/>);

  it ('filters reviews by rating if a tier is selected in Feedback component and sets them to the ReviewService state', () => {
    feedbackWrapper.find('select').simulate('change', { target: { value: '5'} });
    expect(reviewServiceWrapper.state().currentTier).toBe(5);
    expect(reviewServiceWrapper.state().reviewsByTier.length).toBe(2);
  });

});

