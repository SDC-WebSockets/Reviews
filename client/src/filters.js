export const getBestReview = (reviews) => {
  if (!reviews || reviews.length === 0) {
    return;
  }

  let bestReview = reviews[0];
  let tiedBest = [reviews[0]];
  for (let i = 1; i < reviews.length; i++) {
    if (reviews[i].rating > bestReview.rating) {
      bestReview = reviews[i];
      tiedBest = [reviews[i]];
    } else if (reviews[i].rating === bestReview.rating) {
      tiedBest.push(reviews[i]);
    }
  }
  if (tiedBest.length > 1) {
    bestReview = tiedBest[0];
    for (let j = 1; j < tiedBest.length; j++) {
      if (tiedBest[j].comment.length > bestReview.comment.length) {
        bestReview = tiedBest[j];
      }
    }
  }
  return bestReview;
};

export const filterReviewsByTerm = (reviews, term) => {
  let filteredReviews = [];
  if (!reviews) {
    return filteredReviews;
  }
  if (!term) {
    return reviews;
  }
  term = term.toLowerCase();
  reviews.forEach((review) => {
    let comment = review.comment.toLowerCase();
    if (comment.indexOf(term) > - 1 || comment.indexOf(term + 's') > - 1) {
      filteredReviews.push(review);
    }
  });
  return filteredReviews;
};

export const filterReviewsByTier = (reviews, tier) => {
  let filteredReviews = [];
  if (!reviews) {
    return filteredReviews;
  }
  if (!tier) {
    return reviews;
  }
  reviews.forEach((review) => {
    if (Math.floor(review.rating) === tier) {
      filteredReviews.push(review);
    }
  });
  return filteredReviews;
};