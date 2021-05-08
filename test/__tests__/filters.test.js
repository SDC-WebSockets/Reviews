// import React from 'react';
import { getBestReview, filterReviewsByTerm, filterReviewsByTier } from '../../client/src/filters.js';
import { sampleDataForOneCourse } from '../mockData/sampleDataForOneCourse.js';

describe('Function "getBestReview"', () => {
  it ('returns the review with the longest comment if there are multiple five-star reviews', () => {
    let resultReview = getBestReview(sampleDataForOneCourse.reviews);
    expect(resultReview.reviewer.name).toBe('Percy Pacocha');
  });
  it ('returns undefined if given no reviews', () => {
    let resultReview = getBestReview(null);
    expect(resultReview).toBe(undefined);
  });
  it ('returns undefined if given an empty array', () => {
    let resultReview = getBestReview([]);
    expect(resultReview).toBe(undefined);
  });
});

describe('Function "filterReviewsByTerm"', () => {
  it ('returns all reviews that match the search term', () => {
    expect().toBe();
  });
  it ('ignores case', () => {
    expect().toBe();
  });
  it ('returns a review if it contains the search term whether that word ends with an "s" or not', () => {
    expect().toBe();
  });
  it ('returns an empty array if no reviews match the search word', () => {
    expect().toBe();
  });
});


