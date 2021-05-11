import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });
import sinon from 'sinon';

import App from '../../client/src/App.jsx';
import ReviewService from '../../client/src/components/reviewService.jsx';
// import Featured from '../../client/src/components/featured.jsx';

describe('App Component', () => {

  let wrapper = mount(<App/>);

  it ('exists', () => {
    expect(wrapper.containsMatchingElement(<App/>)).toBe(true);
  });

  it ('calls setState in componentDidMount', () => {
    let instance = wrapper.instance();
    jest.spyOn(instance, 'setState');
    instance.componentDidMount();
    expect(instance.setState).toHaveBeenCalledTimes(1);
  });

  it ('renders ReviewService if a courseId between 1 and 100 is selected', () => {
    wrapper.setState({courseId: 9});
    expect(wrapper.containsMatchingElement(<ReviewService />)).toBe(true);
  });
});

describe('ReviewService Component', () => {
  // let appWrapper = mount(<App/>);
  // appWrapper.setState({courseId: 9});
  let wrapper = mount(<ReviewService courseId={9}/>);
  let instance = wrapper.instance();

  it ('exists', () => {
    expect(wrapper.containsMatchingElement(<ReviewService/>)).toBe(true);
  });

  it ('calls the getReviews method in componentDidMount', () => {
    jest.spyOn(instance, 'getReviews');
    instance.componentDidMount();
    expect(instance.getReviews).toHaveBeenCalledTimes(1);
  });

  it ('gets reviews from the server and sets them to the state', () => {
    // jest.mock(ReviewService);
    //   .then((data) => console.log(data));
    instance.getReviews(9);
  });

  // it gets ratings from server and sets them to the state (async)

  // it finds the best review and sets it to the state (async)

  // it only renders the Featured component if the state has a featured review (async)

  // it only renders the Feedback component if the state has ratings (async)

  // it only renders the Search and ReviewList components if the state has reviews (async)

  // it filters reviews by search term if a word is submitted in Search component and sets them to the state (async)

  // it filters reviews by rating if a tier is clicked in Feedback component and sets them to the state (async)

  // it filters reviews by rating if a tier is selected in the dropdown menu in Feedback component and sets them to the state (async)
});