import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import { sampleDataForOneCourse } from '../../mockData/sampleDataForOneCourse.js';

import ReviewService from '../../../client/src/components/reviewService.jsx';
import Featured from '../../../client/src/components/featured.jsx';
import Feedback from '../../../client/src/components/feedback.jsx';
import Search from '../../../client/src/components/search.jsx';
import ReviewList from '../../../client/src/components/ReviewList.jsx';

describe('ReviewService Component', () => {
  const wrapper = mount(<ReviewService courseId={9}/>);
  const instance = wrapper.instance();

  it ('exists', () => {
    expect(wrapper.containsMatchingElement(<ReviewService/>)).toBe(true);
  });

  it ('calls the getReviews method in componentDidMount, gets reviews and ratings from the server, picks the best review, and sets them to the state', () => {
    jest.spyOn(instance, 'getReviews');
    instance.componentDidMount();
    expect(instance.getReviews).toHaveBeenCalledTimes(1);
    expect(instance.state.totalReviews.length).toBe(5);
    expect(instance.state.ratings.overallRating).toBe(4.4);
    expect(instance.state.featuredReview.reviewer.name).toBe('Percy Pacocha');
  });

  wrapper.setState({
    featuredReview: sampleDataForOneCourse.reviews[1],
    ratings: sampleDataForOneCourse.ratings,
    totalReviews: sampleDataForOneCourse.reviews
  });

  it ('only renders the Featured component if the state has a featured review', () => {
    expect(wrapper.containsMatchingElement(<Featured/>)).toBe(true);
  });

  it ('only renders the Feedback component if the state has ratings', () => {
    expect(wrapper.containsMatchingElement(<Feedback/>)).toBe(true);
  });

  it ('only renders the Search and ReviewList components if the state has reviews', () => {
    expect(wrapper.containsMatchingElement(<Search/>)).toBe(true);
    expect(wrapper.containsMatchingElement(<ReviewList/>)).toBe(true);
  });
});