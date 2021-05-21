import React from 'react';
import { Message } from '../styles.js';

const SearchMessage = (props) => {
  // console.log('Props in SearchMessage:', props);
  if (props.reviewsBySearchAndTier) {
    if (props.reviewsBySearchAndTier.length > 0) {
      return (
        <Message>{props.reviewsBySearchAndTier.length} {props.reviewsBySearchAndTier.length === 1 ? 'review' : 'reviews'} mentioning '<strong>{props.currentSearchTerm}</strong>'</Message>
      );
    } else {
      return (
        <Message>
          No reviews mentioning '<strong>{props.currentSearchTerm}</strong>'
          <br></br>
          <br></br>
          Your search returned no results with the selected rating. Try clearing your selection to see reviews matching your search.
        </Message>
      );
    }
  } else if (!props.reviewsBySearchAndTier && props.reviewsBySearch && !props.reviewsByTier) {
    if (props.reviewsBySearch.length > 0) {
      return (
        <Message>{props.reviewsBySearch.length} {props.reviewsBySearch.length === 1 ? 'review' : 'reviews'} mentioning '<strong>{props.currentSearchTerm}</strong>'</Message>
      );
    } else {
      return (
        <Message>
          No reviews mentioning '<strong>{props.currentSearchTerm}</strong>'
          <br></br>
          <br></br>
          No reviews matched your search. Try searching with another term.
        </Message>
      );
    }
  } else if (!props.reviewsBySearchAndTier && !props.reviewsBySearch && props.reviewsByTier) {
    if (props.reviewsByTier.length === 0) {
      return (
        <Message>
          There are no written comments for the rating you've selected. Please select another rating or clear your selection to view all written comments for this course.
        </Message>
      );
    } else {
      return null;
    }
  }
};

export default SearchMessage;