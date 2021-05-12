import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import { sampleDataForOneCourse } from '../../mockData/sampleDataForOneCourse.js';

import Review from '../../../client/src/components/Review.jsx';

describe ('Review component', () => {
  xit ('should show the reviewer\'s initials if no avatar is present', () => {

  });
});
