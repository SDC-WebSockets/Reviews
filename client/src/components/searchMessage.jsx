import React from 'react';

const SearchMessage = (props) => {
  // console.log('Props in SearchMessage:', props);
  if (props.currentReviewsLength > 0) {
    return (
      <div>{props.currentReviewsLength} reviews mentioning '<strong>{props.term}</strong>'</div>
    );
  } else {
    return (
      <div>No reviews mentioning '<strong>{props.term}</strong>'
        <br></br>
        <br></br>
      No reviews matched your search. Try searching with another term.</div>
    );
  }
};

export default SearchMessage;