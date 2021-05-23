import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { sampleDataForOneCourse } from '../../mockData/sampleDataForOneCourse.js';

import Review from '../../../client/src/components/Review.jsx';

describe ('Review component', () => {
  let wrapper = mount(<Review review={sampleDataForOneCourse.reviews[0]} currentSearchTerm='quas'/>);

  it ('shows the reviewer\'s avatar if present', () => {
    const value = wrapper.find('.reviewerPicture').first().props().src;
    expect(value).toContain('https://');
  });

  it ('shows the reviewer\'s initials if no avatar is present', () => {
    wrapper = mount(<Review review={sampleDataForOneCourse.reviews[1]}/>);
    const value = wrapper.find('.reviewerInitials').first().props().children;
    expect(value).toBe('PP');
  });

  const reviewParts = ['reviewerName', 'reviewDate', 'reviewComment'];
  reviewParts.forEach((reviewPart) => {
    it (`has a value for ${reviewPart}`, () => {
      let value = wrapper.find(`.${reviewPart}`).first().props().children;
      expect(value).toBeDefined();
    });
  });

  it ('renders every occurrence of the search term in bold in the review filtered by search term, case insensitive, when a search term is entered', () => {
    wrapper = render(<Review review={sampleDataForOneCourse.reviews[0]} currentSearchTerm='quas'/>);
    expect(wrapper.find('.commentWithBoldSearchTerm').html()).toContain('<strong>quas</strong>');

    wrapper = render(<Review review={sampleDataForOneCourse.reviews[4]} currentSearchTerm='qUaS'/>);
    expect(wrapper.find('.commentWithBoldSearchTerm').html()).toContain('<strong>Quas</strong>i');

    wrapper = render(<Review review={sampleDataForOneCourse.reviews[2]} currentSearchTerm='quas'/>);
    expect(wrapper.find('.commentWithBoldSearchTerm').html()).not.toContain('<strong>');
  });
});
