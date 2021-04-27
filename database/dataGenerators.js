const Review = require('./mongoDb.js').Review;
const Rating = require('./mongoDb.js').Rating;

const addReview = (review) => {
  Review.updateOne({}, {
        course_id: review.course_id,  // "foreign key"
        reviewer: {
          name: review.reviewer.name,
          picture: review.reviewer.picture,
          coursesTaken: review.reviewer.coursesTaken,
          reviews: review.reviewer.reviews
        },
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
        helpful: 0,
        reported: false
      }
    , {upsert:true}, (err) => {
      if (err) {
        console.log('Error saving review to database:', err);
      } else {
        console.log(`Review for course id ${review.course_id} saved/updated in database`);
        // let filter = {course_id: review.course_id};
        let options = {new: true, useFindAndModify: false};
        // let callback = (err) => {
        //   err ? console.log('Error updating rating in database:', err) : console.log(`Updated rating for course id ${review.course_id}`);
        // };
        Rating.findOne({course_id: review.course_id},(err, rating) => {
          if (err) {
            console.log('Error retrieving corresponding rating:', err);
          } else {
            let currentRating = review.rating;
            let newTotalStars = rating.totalStars + currentRating;
            let newTotalRatings = rating.totalRatings + 1;
            let updatedTier = rating.fiveStars + 1;
            let newOverallRating = newTotalStars / newTotalRatings;
            let valuesToSet = { overallRating: newOverallRating, totalRatings: newTotalRatings, totalStars: newTotalStars }
            let callback = (err, results) => { if (err) { console.log('Error updating corresponding rating:', err)} };
            if (review.rating === 5) {
              Rating.updateOne({course_id: review.course_id}, { $set: valuesToSet, $inc: { fiveStars: 1}}, callback);
            } else if (review.rating === 4) {
              Rating.updateOne({course_id: review.course_id}, { $set: valuesToSet, $inc: { fourStars: 1}}, callback);
            } else if (review.rating === 3) {
              Rating.updateOne({course_id: review.course_id}, { $set: valuesToSet, $inc: { threeStars: 1}}, callback);
            } else if (review.rating === 2) {
              Rating.updateOne({course_id: review.course_id}, { $set: valuesToSet, $inc: { twoStars: 1}}, callback);
            } else if (review.rating === 1) {
              Rating.updateOne({course_id: review.course_id}, { $set: valuesToSet, $inc: { oneStar: 1}}, callback);
            }
          }
        })
      }
    })
}






let exampleReview = {
  course_id: 1,  // "foreign key"
  reviewer: {
    name: 'Fred Rosselet',
    picture: 'someUrl',
    coursesTaken: 14,
    reviews: 12
  },
  rating: 5,
  comment: '',
  createdAt: Date.now(),
  helpful: 0,
  reported: false
}

// addReview(exampleReview);


const saveRating = (rating) => {
  Rating.updateOne({course_id: rating.course_id},
    {
      course_id: rating.course_id,
      overallRating: 0,
      totalRatings: 0,
      totalStars: 0,
      fiveStars: 0,
      fourStars: 0,
      threeStars: 0,
      twoStars: 0,
      oneStar: 0
    }
  ,{upsert: true}, (err) => {
    if (err) {
      console.log('Error saving rating to database:', err);
    } else {
      console.log(`Rating for course id ${rating.course_id} saved/updated in database`);
    }
  })
};


// RESET ONE RATING
// let exampleRating = {
//   course_id: 1
// }

// saveRating(exampleRating);


// RESET 100 RATINGS
// const resetRatings = () => {
//   let exampleRating = {
//     course_id: 1
//   }
//   let numberOfTimes = 100;
//   let delay = 100;
//   for (let i = 0; i < numberOfTimes; i++) {
//     setTimeout(() => {
//     saveRating(exampleRating);
//       exampleRating.course_id++;
//     }, delay * i);
//   }
// }

// resetRatings();