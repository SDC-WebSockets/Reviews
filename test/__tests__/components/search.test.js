import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import { sampleDataForOneCourse } from '../../mockData/sampleDataForOneCourse.js';

import Search from '../../../client/src/components/search.jsx';

describe ('Search component', () => {
  xit ('filters reviews by search term if a word is submitted in Search component and sets them to the state', () => {

  });
});