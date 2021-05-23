import React from 'react';
import { magnifyingGlass, xSearch } from '../svg.js';
import {
  Inputs,
  SearchBar,
  ClearSearchBar,
  SearchButtonContainer,
  SearchButton
} from '../styles/search.style.js';

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
    if (term === '') {
      return;
    }
    if (!this.props.currentTier) {
      this.props.setReviewsFilteredBySearch(term);
    } else {
      this.props.setReviewsFilteredBySearchAndTier(term, this.props.currentTier);
    }
  }

  resetSearch() {
    this.setState({term: ''});
    this.props.setReviewsFilteredBySearch(null);
    document.getElementById('reviewSearch').value = '';
  }

  render() {
    return (
      <Inputs>
        <SearchBar id="reviewSearch" className="searchBar" type="text" placeholder="Search reviews" onChange={this.handleTermChange}>
        </SearchBar>
        {this.state.term ?
          <ClearSearchBar id="clearSearch" onClick={this.resetSearch}>
            <span dangerouslySetInnerHTML={{ __html: xSearch }}></span>
          </ClearSearchBar>
          :
          null}
        <SearchButtonContainer>
          <SearchButton className="searchButton" type="submit" onClick={() => { this.filterByTerm(this.state.term); }}>
            <span dangerouslySetInnerHTML={{ __html: magnifyingGlass }}></span>
          </SearchButton>
        </SearchButtonContainer>
      </Inputs>
    );
  }
}




export default Search;