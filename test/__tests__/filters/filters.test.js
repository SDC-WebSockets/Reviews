import { getBestReview, filterReviewsByTerm, filterReviewsByTier } from '../../../client/src/filters.js';
import { sampleDataForOneCourse } from '../../mockData/sampleDataForOneCourse.js';

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
    let resultReviews = filterReviewsByTerm(sampleDataForOneCourse.reviews, 'et');
    expect(resultReviews.length).toBe(4);
  });
  it ('ignores case', () => {
    let resultReviews = filterReviewsByTerm(sampleDataForOneCourse.reviews, 'NON');
    expect(resultReviews.length).toBe(2);
  });
  it ('returns a review if it contains the search term whether that word ends with an "s" or not', () => {
    let resultReviews = filterReviewsByTerm(sampleDataForOneCourse.reviews, 'qua');
    expect(resultReviews.length).toBe(5);
  });
  it ('returns an empty array if no reviews match the search word', () => {
    let resultReviews = filterReviewsByTerm(sampleDataForOneCourse.reviews, 'absent');
    expect(resultReviews.length).toBe(0);
  });
  it ('returns an empty array if there are no input reviews', () => {
    let resultReviews = filterReviewsByTier(null, 'et');
    expect(resultReviews.length).toBe(0);
  });
  it ('returns all reviews if there is no input search term', () => {
    let resultReviews = filterReviewsByTier(sampleDataForOneCourse.reviews, null);
    expect(resultReviews.length).toBe(5);
  });
});

describe('Function "filterReviewsByTier"', () => {
  it ('returns all reviews that match the input tier', () => {
    let resultReviews = filterReviewsByTier(sampleDataForOneCourse.reviews, 5);
    expect(resultReviews.length).toBe(2);
  });
  it ('returns an empty array if no reviews match the input tier', () => {
    let resultReviews = filterReviewsByTier(sampleDataForOneCourse.reviews, 2);
    expect(resultReviews.length).toBe(0);
  });
  it ('returns an empty array if there are no input reviews', () => {
    let resultReviews = filterReviewsByTier(null, 1);
    expect(resultReviews.length).toBe(0);
  });
  it ('returns all reviews if there is no input tier', () => {
    let resultReviews = filterReviewsByTier(sampleDataForOneCourse.reviews, null);
    expect(resultReviews.length).toBe(5);
  });
});


