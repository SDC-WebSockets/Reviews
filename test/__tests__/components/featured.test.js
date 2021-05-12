import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import { sampleDataForOneCourse } from '../../mockData/sampleDataForOneCourse.js';

import Featured from '../../../client/src/components/featured.jsx';

describe ('Featured component', () => {
  xit ('shows the reviewer\'s initials if no avatar is present', () => {

  });

  xit ('shows how many courses the reviewer has taken and how many review they have written', () => {

  });

  // thumbs
  // report
});