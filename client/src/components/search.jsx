import React from 'react';
import SearchMessage from './searchMessage.jsx';

class Search extends React.Component {
  constructor(props) {
    // console.log('Props in Search:', props);
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.state = {
      term: '',
      currentSearch: null
    };
  }

  handleChange(e) {
    this.setState({term: e.target.value});
  }

  filterByTerm(reviews, term) {
    if (term.trim() === '') {
      return;
    }
    term = term.toLowerCase().trim();
    let filteredReviews = [];
    reviews.forEach((review) => {
      let comment = review.comment.toLowerCase();
      if (comment.includes(term)) {
        filteredReviews.push(review);
      }
    });
    console.log(filteredReviews);
    this.setState({currentSearch: term});
    this.props.setReviews(filteredReviews);
  }

  resetSearch() {
    this.setState({term: ''});
    this.props.setReviews(null);
    let searchField = document.getElementById('search');
    searchField.value = '';
  }

  render() {
    return (
      <div>
        <input id="search" type="text" placeholder="Search reviews" onChange={this.handleChange}></input>
        {this.state.term ? <button onClick={this.resetSearch}>X</button> : null}
        <input type="submit" value="Search" onClick={() => { this.filterByTerm(this.props.reviews, this.state.term); }}></input>
        <select>
          <option value>All ratings</option>
          <option value="5">Five stars</option>
          <option value="4">Four stars</option>
          <option value="3">Three stars</option>
          <option value="2">Two stars</option>
          <option value="1">One star</option>
        </select>
        {this.props.filtered === null ? null : <SearchMessage filtered={this.props.filtered} term={this.state.currentSearch}/>}
      </div>
    );
  }
}




export default Search;