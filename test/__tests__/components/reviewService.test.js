import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import { sampleDataForOneCourse } from '../../mockData/sampleDataForOneCourse.js';
// import regeneratorRuntime from 'regenerator-runtime';

import ReviewService from '../../../client/src/components/reviewService.jsx';
import Featured from '../../../client/src/components/featured.jsx';
import Feedback from '../../../client/src/components/feedback.jsx';
import Search from '../../../client/src/components/search.jsx';
import ReviewList from '../../../client/src/components/ReviewList.jsx';

describe('ReviewService Component', () => {

  const wrapper = mount(<ReviewService courseId={9}/>);
  const instance = wrapper.instance();

  it ('calls the getReviews method in componentDidMount', () => {
    jest.spyOn(instance, 'getReviews');
    instance.componentDidMount();
    expect(instance.getReviews).toHaveBeenCalledTimes(1);
  });

  it ('only renders the Featured component if the state has a featured review', () => {
    expect(wrapper.containsMatchingElement(<Featured/>)).toBe(false);
    wrapper.setState({featuredReview: sampleDataForOneCourse.reviews[1]});
    expect(wrapper.containsMatchingElement(<Featured/>)).toBe(true);
  });

  it ('only renders the Feedback component if the state has ratings', () => {
    expect(wrapper.containsMatchingElement(<Feedback/>)).toBe(false);
    wrapper.setState({ratings: sampleDataForOneCourse.ratings});
    expect(wrapper.containsMatchingElement(<Feedback/>)).toBe(true);
  });

  it ('only renders the Search and ReviewList components if the state has reviews', () => {
    expect(wrapper.containsMatchingElement(<Search/>)).toBe(false);
    expect(wrapper.containsMatchingElement(<ReviewList/>)).toBe(false);
    wrapper.setState({totalReviews: sampleDataForOneCourse.reviews});
    expect(wrapper.containsMatchingElement(<Search/>)).toBe(true);
    expect(wrapper.containsMatchingElement(<ReviewList/>)).toBe(true);
  });
});