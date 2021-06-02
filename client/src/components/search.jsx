import React from 'react';
import { magnifyingGlassPath, xPath } from '../svg.js';
import {
  ReviewInputs,
  ReviewSearchInput,
  ReviewSearchBar,
  ReviewClearSearchBar,
  ReviewSearchButton
} from '../styles/search.style.js';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.filterByTerm = this.filterByTerm.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

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

  handleKeyPress (e) {
    if (e.key === 'Enter') {
      this.filterByTerm(this.state.term);
    }
  }

  resetSearch() {
    this.setState({term: ''});
    this.props.setReviewsFilteredBySearch(null);
    document.getElementById('reviewSearch').value = '';
  }

  render() {
    return (
      <ReviewInputs>
        <ReviewSearchInput>
          <ReviewSearchBar id="reviewSearch" className="searchBar" type="text" placeholder="Search reviews" onChange={this.handleTermChange} onKeyPress={this.handleKeyPress}>
          </ReviewSearchBar>
          <ReviewClearSearchBar id="clearSearch" onClick={this.resetSearch} style={this.state.term ? {visibility: 'visible'} : {visibility: 'hidden'}}>
            <svg viewBox="0 0 24 24">
              <path fill="rgb(115, 114, 108)" d={xPath}/>
            </svg>
          </ReviewClearSearchBar>
        </ReviewSearchInput>
        <ReviewSearchButton className="searchButton" type="submit" onClick={() => { this.filterByTerm(this.state.term); }}>
          <svg viewBox="-7 -7 35 35">
            <path fill="rgb(255, 255, 255)" d={magnifyingGlassPath}/>
          </svg>
        </ReviewSearchButton>
      </ReviewInputs>
    );
  }
}




export default Search;