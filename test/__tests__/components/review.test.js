import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import { sampleDataForOneCourse } from '../../mockData/sampleDataForOneCourse.js';

import Review from '../../../client/src/components/Review.jsx';

describe ('Review component', () => {

  let wrapper = mount(<Review review={sampleDataForOneCourse.reviews[0]} currentSearchTerm='quas'/>);

  it ('should show the reviewer\'s avatar is present', () => {
    const value = wrapper.find('.reviewerAvatar').props().children.props.src;
    expect(value).toContain('https://');
  });

  it ('should show the reviewer\'s initials if no avatar is present', () => {
    wrapper = mount(<Review review={sampleDataForOneCourse.reviews[1]}/>);
    const value = wrapper.find('.reviewerAvatar').props().children.props.children;
    expect(value).toBe('PP');
  });

  const reviewParts = ['reviewerName', 'reviewRating', 'reviewDate', 'reviewComment'];
  reviewParts.forEach((reviewPart) => {
    it (`has a value for ${reviewPart}`, () => {
      let value = wrapper.find(`.${reviewPart}`).props().children;
      expect(value).toBeDefined();
    });
  });
  
  // thumbs buttons when implemented
  // report button when implemented
});
