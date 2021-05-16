import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import { sampleDataForOneCourse } from '../../mockData/sampleDataForOneCourse.js';

import ReviewList from '../../../client/src/components/ReviewList.jsx';
import ReviewService from '../../../client/src/components/reviewService.jsx';
import Review from '../../../client/src/components/Review.jsx';

describe ('ReviewList component', () => {
  const reviewServiceWrapper = mount(<ReviewService courseId={9}/>);
  const instance = reviewServiceWrapper.instance();

  reviewServiceWrapper.setState({
    totalReviews: sampleDataForOneCourse.reviews,
    currentSearchTerm: 'quas',
    reviewsBySearch: [sampleDataForOneCourse.reviews[0], sampleDataForOneCourse.reviews[1], sampleDataForOneCourse.reviews[4]]
  });

  const wrapper = mount(<ReviewList totalReviews={instance.state.totalReviews} reviewsBySearch={instance.state.reviewsBySearch} currentSearchTerm={instance.state.currentSearchTerm}/>);

  it ('only renders reviews if some are passed down from ReviewService', () => {
    expect(wrapper.containsMatchingElement(<Review/>)).toBe(true);
  });

});