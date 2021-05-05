import React from 'react';

const SearchMessage = (props) => {
  if (props.filtered.length > 0) {
    return (
      <div>{this.props.filtered.length} reviews mentioning '<b>{props.term}</b>'</div>
    );
  } else {
    return (
      <div>No reviews mentioning '<b>{props.term}</b>'
        <br></br>
        <br></br>
      No reviews matched your search. Try searching with another term.</div>
    );
  }
};

export default SearchMessage;