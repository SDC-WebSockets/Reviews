# POST Course Reviews Data
Get all ratings, reviews and reviewers for a given courseId.

**URL**: `/reviews/item/:courseId`

**Method**: `POST`

## Request ##
### Path params ###
`courseId`: Integer, Required

## Response ##
**Code**: `200 OK`

### Sample response ###
```json
{
  courseId: 2,
  ratings: {
    courseId: 2,
    overallRating: null,
    totalRatings: 0,
    totalStars: null,
    five: 0,
    fourhalf: 0,
    four: 0,
    threehalf: 0,
    three: 0,
    twohalf: 0,
    two: 0,
    onehalf: 0,
    one: 0
  },
  reviews: [],
  reviewers: []
}
```

**Code**: `400`
### Sample response ###
failed to add course 2
