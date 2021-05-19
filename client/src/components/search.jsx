import React from 'react';
import { Title } from '../styles.js';

class Search extends React.Component {
  constructor(props) {
    // console.log('Props in Search:', props);
    super(props);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.filterByTerm = this.filterByTerm.bind(this);
    this.resetSearch = this.resetSearch.bind(this);

    this.state = {
      term: '',
    };
  }

  handleTermChange(e) {
    this.setState({term: e.target.value});
  }

  filterByTerm(term) {
    term = term.trim();
    if (!this.props.currentTier) {
      this.props.setReviewsFilteredBySearch(term);
    } else {
      this.props.setReviewsFilteredBySearchAndTier(term, this.props.currentTier);
    }
  }

  resetSearch() {
    this.setState({term: ''});
    this.props.setReviewsFilteredBySearch(null);
    document.getElementById('search').value = '';
  }

  render() {
    return (
      <div>
        <div>
          <Title>Reviews</Title>
          <input id="search" type="text" placeholder="Search reviews" onChange={this.handleTermChange}></input>
          {this.state.term ? <button onClick={this.resetSearch}>X</button> : null}
          <input id="searchSubmit" type="submit" value="Search" onClick={() => { this.filterByTerm(this.state.term); }}></input>
        </div>
        <div id="tierMenu"></div>
      </div>
    );
  }
}




export default Search;