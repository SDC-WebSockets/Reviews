import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import { sampleDataForOneCourse } from '../../mockData/sampleDataForOneCourse.js';

import ReviewList from '../../../client/src/components/ReviewList.jsx';

xdescribe ('ReviewList component', () => {
  xit ('', ()=> {

  });

  xit ('only renders SearchMessage if a search term is entered', () => {

  });
});