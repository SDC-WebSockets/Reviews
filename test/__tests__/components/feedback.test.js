import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import { sampleDataForOneCourse } from '../../mockData/sampleDataForOneCourse.js';

import ReviewService from '../../../client/src/components/reviewService.jsx';
import Feedback from '../../../client/src/components/feedback.jsx';

describe ('Feedback component', () => {
  xit ('filters reviews by rating if a tier is clicked in Feedback component and sets them to the state', () => {

  });

  xit ('filters reviews by rating if a tier is selected in the dropdown menu in Feedback component and sets them to the state', () => {

  });
});

