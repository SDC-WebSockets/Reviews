import React from 'react';
import { magnifyingGlass, x } from '../svg.js';
import {
  Title,
  Inputs,
  SearchBar,
  ButtonContainer,
  ClearSearchBar,
  SearchButton
} from '../styles.js';

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
            <span dangerouslySetInnerHTML={{ __html: x }}></span>
          </ClearSearchBar>
          :
          null}
        <ButtonContainer>
          <SearchButton className="searchButton" type="submit" onClick={() => { this.filterByTerm(this.state.term); }}>
            <span dangerouslySetInnerHTML={{ __html: magnifyingGlass }}></span>
          </SearchButton>
        </ButtonContainer>
      </Inputs>
    );
  }
}




export default Search;