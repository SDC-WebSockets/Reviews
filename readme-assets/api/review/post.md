# POST Review
Post review by course and id.

**URL**: `/reviews/item/:courseId/review/:reviewId`

**Method**: `POST`

## Request ##
### Path params ###
`courseId`: Integer

`reviewId`: String
### body ###
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
**Case**: Missing fields in body
### Sample response ###
Payload missing required fields

**Code**: `400`
**Case**: Improper formatting or duplicate entry
### Sample response ###
```json
Failed to create review for course 1
```