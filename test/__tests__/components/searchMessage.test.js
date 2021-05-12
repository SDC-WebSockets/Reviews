import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import { sampleDataForOneCourse } from '../../mockData/sampleDataForOneCourse.js';

import SearchMessage from '../../../client/src/components/searchMessage.jsx';

xdescribe ('SearchMessage component', () => {
  xit ('renders a different message if there are reviews that match the search or not', () => {

  });
});