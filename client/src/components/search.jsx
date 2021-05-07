import React from 'react';

class Search extends React.Component {
  constructor(props) {
    console.log('Props in Search:', props);
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
    term = term.toLowerCase().trim();
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
        <input id="search" type="text" placeholder="Search reviews" onChange={this.handleTermChange}></input>
        {this.state.term ? <button onClick={this.resetSearch}>X</button> : null}
        <input type="submit" value="Search" onClick={() => { this.filterByTerm(this.state.term); }}></input>
      </div>
    );
  }
}




export default Search;