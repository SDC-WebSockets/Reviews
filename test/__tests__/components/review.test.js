import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { sampleDataForOneCourse } from '../../mockData/sampleDataForOneCourse.js';

import Review from '../../../client/src/components/Review.jsx';

describe ('Review component', () => {
  let wrapper = mount(<Review review={sampleDataForOneCourse.reviews[0]} currentSearchTerm='quas'/>);

  it ('shows the reviewer\'s avatar is present', () => {
    const value = wrapper.find('.reviewerAvatar').props().children.props.src;
    expect(value).toContain('https://');
  });

  it ('shows the reviewer\'s initials if no avatar is present', () => {
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

  it ('renders every occurrence of the search term in bold in the review filtered by search term, case insensitive, when a search term is entered', () => {
    wrapper = render(<Review review={sampleDataForOneCourse.reviews[0]} currentSearchTerm='quas'/>);
    expect(wrapper.find('.commentWithBoldSearchTerm').html()).toContain('<strong>quas</strong>');

    wrapper = render(<Review review={sampleDataForOneCourse.reviews[4]} currentSearchTerm='qUaS'/>);
    expect(wrapper.find('.commentWithBoldSearchTerm').html()).toContain('<strong>Quas</strong>i');

    wrapper = render(<Review review={sampleDataForOneCourse.reviews[2]} currentSearchTerm='quas'/>);
    expect(wrapper.find('.commentWithBoldSearchTerm').html()).not.toContain('<strong>');
  });

  // thumbs buttons when implemented
  // report button when implemented
});
