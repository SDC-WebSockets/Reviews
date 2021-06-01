import React from 'react';
import { ReviewMessage } from '../styles/searchMessage.style.js';

const SearchMessage = (props) => {
  if (props.reviewsBySearchAndTier) {
    if (props.reviewsBySearchAndTier.length > 0) {
      return (
        <ReviewMessage>{props.reviewsBySearchAndTier.length} {props.reviewsBySearchAndTier.length === 1 ? 'review' : 'reviews'} mentioning '<strong>{props.currentSearchTerm}</strong>'</ReviewMessage>
      );
    } else {
      return (
        <ReviewMessage>
          No reviews mentioning '<strong>{props.currentSearchTerm}</strong>'
          <br></br>
          <br></br>
          Your search returned no results with the selected rating. Try clearing your selection to see reviews matching your search.
        </ReviewMessage>
      );
    }
  } else if (!props.reviewsBySearchAndTier && props.reviewsBySearch && !props.reviewsByTier) {
    if (props.reviewsBySearch.length > 0) {
      return (
        <ReviewMessage>{props.reviewsBySearch.length} {props.reviewsBySearch.length === 1 ? 'review' : 'reviews'} mentioning '<strong>{props.currentSearchTerm}</strong>'</ReviewMessage>
      );
    } else {
      return (
        <ReviewMessage>
          No reviews mentioning '<strong>{props.currentSearchTerm}</strong>'
          <br></br>
          <br></br>
          No reviews matched your search. Try searching with another term.
        </ReviewMessage>
      );
    }
  } else if (!props.reviewsBySearchAndTier && !props.reviewsBySearch && props.reviewsByTier) {
    if (props.reviewsByTier.length === 0) {
      return (
        <ReviewMessage>
          There are no written comments for the rating you've selected. Please select another rating or clear your selection to view all written comments for this course.
        </ReviewMessage>
      );
    } else {
      return null;
    }
  }
};

export default SearchMessage;