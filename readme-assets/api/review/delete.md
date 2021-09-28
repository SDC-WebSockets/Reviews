# DELETE Review
Delete review by course and id.

**URL**: `/reviews/item/:courseId/review/:reviewId`

**Method**: `DELETE`

## Request ##
### Path params ###
`courseId`: Integer, Required

`reviewId`: String, Required
### body ###
Required
```json
{
  reviewId: "3172a410566562b5cc116c3414e958ec",
  courseId: 1,
  rating: 1.5,
  comment: "Not worth it. Don't take it.",
  createdAt: "2021-06-11T22:03:27.941Z",
  helpful: 13,
  reported: false,
  reviewer: "f6e794a75c5d51de081dbefa224304f9"
}
```

## Response ##
**Code**: `200 OK`

### Sample response ###
review for course 1 successfully deleted


**Code**: `400`
### Sample response ###
failed to delete review for course 1
