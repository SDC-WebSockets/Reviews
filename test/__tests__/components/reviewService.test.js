import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { sampleDataForOneCourse } from '../../mockData/sampleDataForOneCourse.js';

import ReviewService from '../../../client/src/reviewService.jsx';
import Featured from '../../../client/src/components/featured.jsx';
import Feedback from '../../../client/src/components/feedback.jsx';
import Search from '../../../client/src/components/search.jsx';
import ReviewList from '../../../client/src/components/ReviewList.jsx';
import SearchMessage from '../../../client/src/components/searchMessage.jsx';

describe('ReviewService Component', () => {

  const wrapper = mount(<ReviewService />);
  const instance = wrapper.instance();

  it ('calls the getReviews method in componentDidMount', () => {
    jest.spyOn(instance, 'getReviews');
    instance.componentDidMount();
    expect(instance.getReviews).toHaveBeenCalledTimes(1);
  });

  it ('only renders the Featured component if the state has a featured review and if the course has at least ten reviews', () => {
    expect(wrapper.containsMatchingElement(<Featured/>)).toBe(false);
    const blankWrapper = shallow(<ReviewService />);
    blankWrapper.setState({
      courseId: 9,
      totalReviews: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      featuredReview: sampleDataForOneCourse.reviews[1]
    });
    expect(blankWrapper.containsMatchingElement(<Featured/>)).toBe(true);
  });

  it ('only renders the Feedback component if the state has ratings', () => {
    expect(wrapper.containsMatchingElement(<Feedback/>)).toBe(false);
    wrapper.setState({courseId: 9, ratings: sampleDataForOneCourse.ratings});
    expect(wrapper.containsMatchingElement(<Feedback/>)).toBe(true);
  });

  it ('only renders the Search and ReviewList components if the state has reviews', () => {
    expect(wrapper.containsMatchingElement(<Search/>)).toBe(false);
    expect(wrapper.containsMatchingElement(<ReviewList/>)).toBe(false);
    wrapper.setState({courseId: 9, totalReviews: sampleDataForOneCourse.reviews});
    expect(wrapper.containsMatchingElement(<Search/>)).toBe(true);
    expect(wrapper.containsMatchingElement(<ReviewList/>)).toBe(true);
  });

  it ('renders SearchMessage if a search term has been entered', () => {
    expect(wrapper.containsMatchingElement(<SearchMessage/>)).toBe(false);
    wrapper.setState({
      courseId: 9,
      reviewsBySearch: [sampleDataForOneCourse.reviews[0], sampleDataForOneCourse.reviews[1], sampleDataForOneCourse.reviews[4]],
      currentSearchTerm: 'quas'
    });
    expect(wrapper.containsMatchingElement(<SearchMessage/>)).toBe(true);
    wrapper.setState({
      reviewsBySearch: null,
      currentSearchTerm: null
    });
  });

  it ('renders SearchMessage if a requested tier has no reviews', () => {
    expect(wrapper.containsMatchingElement(<SearchMessage/>)).toBe(false);
    wrapper.setState({
      courseId: 9,
      reviewsByTier: [],
      currentTier: 2
    });
    expect(wrapper.containsMatchingElement(<SearchMessage/>)).toBe(true);
  });

});