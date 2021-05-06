import React from 'react';
import SearchMessage from './searchMessage.jsx';

class Search extends React.Component {
  constructor(props) {
    // console.log('Props in Search:', props);
    super(props);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.filterByTier = this.filterByTier.bind(this);
    this.filterByTerm = this.filterByTerm.bind(this);
    this.resetSearch = this.resetSearch.bind(this);

    this.state = {
      term: '',
      currentSearch: null
    };
  }

  handleTermChange(e) {
    this.setState({term: e.target.value});
  }

  filterByTier(e) {
    this.props.propsFromReviewService.setReviewsFilteredByTier(e.target.value);
  }

  filterByTerm(term) {
    this.props.propsFromReviewService.setReviewsFilteredBySearch(term);
    this.setState({currentSearch: term});
  }

  resetSearch() {
    this.setState({term: ''});
    this.props.propsFromReviewService.setReviewsFilteredBySearch(null);
    document.getElementById('search').value = '';
  }

  render() {
    return (
      <div>
        <input id="search" type="text" placeholder="Search reviews" onChange={this.handleTermChange}></input>
        {this.state.term ? <button onClick={this.resetSearch}>X</button> : null}
        <input type="submit" value="Search" onClick={() => { this.filterByTerm(this.state.term); }}></input>
        <select onChange={this.filterByTier}>
          <option value="all">All ratings</option>
          <option value="5">Five stars</option>
          <option value="4">Four stars</option>
          <option value="3">Three stars</option>
          <option value="2">Two stars</option>
          <option value="1">One star</option>
        </select>
        {this.props.propsFromReviewService.reviewsBySearch !== null ? <SearchMessage filtered={this.props.propsFromReviewService.reviewsBySearch} term={this.state.currentSearch}/> : null}
      </div>
    );
  }
}




export default Search;