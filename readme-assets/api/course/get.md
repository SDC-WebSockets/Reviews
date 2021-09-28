# GET Course Reviews Data
Get all ratings, reviews and reviewers for a given courseId.

**URL**: `/reviews/item/:courseId`

**Method**: `GET`

## Request ##
### Path params ###
`courseId`: Integer, Required

## Response ##
**Code**: `200 OK`

### Sample response ###
```json
{
  courseId: 1,
  ratings: {
    courseId: 1,
    overallRating: 3.5,
    totalRatings: 4,
    totalStars: null,
    five: 1,
    fourhalf: 1,
    four: 0,
    threehalf: 0,
    three: 1,
    twohalf: 0,
    two: 0,
    onehalf: 1,
    one: 0
  },
  reviews: [
    {
      reviewId: "079b0363d2be572e7be7fafc4775f4b0",
      courseId: 1,
      rating: 5,
      comment: "Loved the course! I learned so much!",
      createdAt: "2021-07-01T06:12:51.903Z",
      helpful: 2,
      reported: false,
      reviewer: "1ee3dfcd8a0645a25a35977997223d22"
    },
    {
      reviewId: "cde5b1aaf057a9f16d605a6a981703f7",
      courseId: 1,
      rating: 4.5,
      comment: "I'm glad I took the course. Really clear content, well planned and usually well executed.",
      createdAt: "2021-05-15T09:38:53.665Z",
      helpful: 6,
      reported: false,
      reviewer: "ba9fab001f67381e56e410575874d967"
    },
    {
      reviewId: "d81bcc6d4a24255c20ebd1111a45001f",
      courseId: 1,
      rating: 3,
      comment: "It was okay. The instructor was difficult to understand and would often veer off into unplanned conversations which were interesting but only tangentially related to the content. Would've been great if the course wasn't so short, but it felt like he was using time we just didn't have!",
      createdAt: "2021-08-01T22:36:59.734Z",
      helpful: 31,
      reported: false,
      reviewer: "05b2c0a62ef25ac7c2ea2eb32d3e27bc"
    },
    {
      reviewId: "3172a410566562b5cc116c3414e958ec",
      courseId: 1,
      rating: 1.5,
      comment: "Not worth it. Don't take it.",
      createdAt: "2021-06-11T22:03:27.941Z",
      helpful: 12,
      reported: false,
      reviewer: "f6e794a75c5d51de081dbefa224304f9"
    }
  ],
  reviewers: [
    {
      reviewerId: "1ee3dfcd8a0645a25a35977997223d22",
      name: "Lynne Wuckert",
      picture: "https://rpt27-sdc-websockets.s3.us-west-2.amazonaws.com/avatars/avatar14.jpg",
      coursesTaken: 12,
      reviews: 2
    },
    {
      reviewerId: "ba9fab001f67381e56e410575874d967",
      name: "Clifford Cassin",
      picture: "rgb(77, 171, 101)",
      coursesTaken: 1,
      reviews: 1
    },
    {
      reviewerId: "05b2c0a62ef25ac7c2ea2eb32d3e27bc",
      name: "Dan Grimes",
      picture: "rgb(115, 114, 108)",
      coursesTaken: 4,
      reviews: 3
    },
    {
      reviewerId: "f6e794a75c5d51de081dbefa224304f9",
      name: "Victoria Schuppe",
      picture: "rgb(40, 150, 169)",
      coursesTaken: 1,
      reviews: 1
    }
  ]
}
```

**Code**: `400`
### Sample response ###
```json
course 1 does not exist
```