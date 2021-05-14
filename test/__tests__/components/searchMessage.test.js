import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import { sampleDataForOneCourse } from '../../mockData/sampleDataForOneCourse.js';

import SearchMessage from '../../../client/src/components/searchMessage.jsx';

describe ('SearchMessage component', () => {
  it ('renders a message if there are reviews that match the search', () => {
    let wrapper = mount(<SearchMessage reviewsBySearch={[sampleDataForOneCourse.reviews[0], sampleDataForOneCourse.reviews[1], sampleDataForOneCourse.reviews[4]]} currentSearchTerm='quas'/>);
    expect(wrapper.text()).toContain('3 reviews mentioning \'quas\'');
    wrapper = mount(<SearchMessage
      reviewsBySearch={[sampleDataForOneCourse.reviews[0], sampleDataForOneCourse.reviews[1], sampleDataForOneCourse.reviews[4]]} currentSearchTerm='quas'
      reviewsByTier={[sampleDataForOneCourse.reviews[0]]}
      currentTier={4}
      reviewsBySearchAndTier={[sampleDataForOneCourse.reviews[0]]}
    />);
    expect(wrapper.text()).toContain('1 review mentioning \'quas\'');
  });

  it ('renders a different message if there are no reviews that match the search', () => {
    const wrapper = mount(<SearchMessage reviewsBySearch={[]} currentSearchTerm='oogabooga'/>);
    expect(wrapper.text()).toContain('No reviews mentioning \'oogabooga\'');
    expect(wrapper.text()).toContain('No reviews matched your search. Try searching with another term.');
  });

  it ('does not render message if there are reviews that match the selected tier', () => {
    const wrapper = mount(<SearchMessage reviewsByTier={[sampleDataForOneCourse.reviews[1], sampleDataForOneCourse.reviews[4]]} currentTier={5}/>);
    expect(wrapper.text()).toHaveLength(0);
  });

  it ('renders a different message if there are no reviews that match the selected tier', () => {
    const wrapper = mount(<SearchMessage reviewsByTier={[]} currentTier={2}/>);
    expect(wrapper.text()).toContain('There are no written comments for the rating you\'ve selected. Please select another rating or clear your selection to view all written comments for this course.');
  });

  it ('renders a different message if there are no reviews that match the selected tier and search term combined', () => {
    const wrapper = mount(<SearchMessage
      reviewsByTier={[sampleDataForOneCourse.reviews[1], sampleDataForOneCourse.reviews[4]]} 
      currentTier={5}
      reviewsBySearch={[sampleDataForOneCourse.reviews[0]]}
      currentSearchTerm='similique'
      reviewsBySearchAndTier={[]}
    />);
    expect(wrapper.text()).toContain('No reviews mentioning \'similique\'');
    expect(wrapper.text()).toContain('Your search returned no results with the selected rating. Try clearing your selection to see reviews matching your search.');
  });
});