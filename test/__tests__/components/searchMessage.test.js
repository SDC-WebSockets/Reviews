import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import { sampleDataForOneCourse } from '../../mockData/sampleDataForOneCourse.js';

import SearchMessage from '../../../client/src/components/searchMessage.jsx';

describe ('SearchMessage component', () => {
  it ('renders a different message if there are reviews that match the search or not', () => {
    let wrapper = mount(<SearchMessage currentReviewsLength={3} term='quas'/>);
    expect(wrapper.text()).toContain('3 reviews mentioning \'quas\'');
    wrapper = mount(<SearchMessage currentReviewsLength={0} term='oogabooga'/>);
    expect(wrapper.text()).toContain('No reviews mentioning \'oogabooga\'');
    expect(wrapper.text()).toContain('No reviews matched your search. Try searching with another term.');
  });
});