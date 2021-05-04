import React from 'react';
import ReviewService from './components/reviewService.jsx';
import querystring from 'querystring';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: null
    };
  }

  componentDidMount() {
    let courseId = Number(querystring.parse(window.location.search)['?courseId']);
    this.setState({courseId: courseId});
  }

  render() {
    return (
      <div>
        <form>
          <input type="number" placeholder="id" name="courseId" min="1" max="100"/>
          <input type="submit" value="Submit"/>
        </form>
        <div>
          {this.state.courseId && <ReviewService courseId={this.state.courseId}/>}
        </div>
      </div>
    );
  }
}

export default App;