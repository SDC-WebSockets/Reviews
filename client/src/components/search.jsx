import React from 'react';

class Search extends React.Component {
  constructor(props) {
    console.log('Props in Search:', props);
    super(props);
    // this.state = {
    //   term: ''
    // };
  }

  // function to update reviewList's state on search submit (prevent refresh)

  // function to update reviewList's state on star tier select (prevent refresh)

  // function for X button




  render() {
    return (
      <div>
        <form>
          <input type="text" placeholder="Search reviews"></input>
          <button>X</button>
          <input type="submit" value="Search"></input>
        </form>
        <select>
          <option value>All ratings</option>
          <option value="5">Five stars</option>
          <option value="4">Four stars</option>
          <option value="3">Three stars</option>
          <option value="2">Two stars</option>
          <option value="1">One star</option>
        </select>
      </div>
    );
  }
}

export default Search;