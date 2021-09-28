# GET Review
Get review by course and id.

**URL**: `/reviews/item/:courseId/review/:reviewId`

**Method**: `GET`

## Request ##
### Path params ###
`courseId`: Integer, Required

`reviewId`: String, Required

## Response ##
**Code**: `200 OK`

### Sample response ###
```json
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
```

**Code**: `400`
### Sample response ###
```json
Failed to fetch review for document 3172a410566562b5cc116c3414e958ec
```