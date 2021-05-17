import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import { sampleDataForOneCourse } from '../../mockData/sampleDataForOneCourse.js';

import App from '../../../client/src/App.jsx';
import ReviewService from '../../../client/src/components/reviewService.jsx';

xdescribe('App Component', () => {

  const wrapper = mount(<App/>);

  it ('calls setState in componentDidMount', () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, 'setState');
    instance.componentDidMount();
    expect(instance.setState).toHaveBeenCalledTimes(1);
  });

  it ('renders ReviewService if a courseId between 1 and 100 is selected', () => {
    wrapper.setState({courseId: 9});
    expect(wrapper.containsMatchingElement(<ReviewService/>)).toBe(true);
  });
});
