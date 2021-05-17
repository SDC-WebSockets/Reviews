import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import { sampleDataForOneCourse } from '../../mockData/sampleDataForOneCourse.js';

import ReviewService from '../../../client/src/reviewService.jsx';
import Search from '../../../client/src/components/search.jsx';


describe ('Search component', () => {

  const reviewServiceWrapper = mount(<ReviewService courseId={9}/>);

  reviewServiceWrapper.setState({
    totalReviews: sampleDataForOneCourse.reviews
  });

  const instance = reviewServiceWrapper.instance();

  const searchWrapper = mount(<Search reviews={instance.state.totalReviews} setReviewsFilteredBySearch={instance.setReviewsFilteredBySearch}/>);

  it ('filters reviews by search term if a word is submitted in Search component and sets them to the state', () => {
    searchWrapper.find('#search').simulate('change', { target: { value: 'quas'} });
    searchWrapper.find('#searchSubmit').simulate('click');
    expect(reviewServiceWrapper.state().currentSearchTerm).toBe('quas');
    expect(reviewServiceWrapper.state().reviewsBySearch.length).toBe(3);
  });
});