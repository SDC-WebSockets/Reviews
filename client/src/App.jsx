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
          <input type="number" placeholder={this.state.courseId || 'id'} name="courseId" min="1" max="100"/>
          <input type="submit" value="Submit"/>
        </form>
        {this.state.courseId ? <ReviewService courseId={this.state.courseId}/> : null}
      </div>
    );
  }
}

export default App;