# GET Reviewer
Get reviewer by id.

**URL**: `/reviews/reviewer/:reviewerId`

**Method**: `GET`

## Request ##
### Path params ###
`reviewerId`: String, Required

## Response ##
**Code**: `200 OK`

### Sample response ###
```json
{
  reviewerId: "1ee3dfcd8a0645a25a35977997223d22",
  name: "Lynne Wuckert",
  picture: "https://rpt27-sdc-websockets.s3.us-west-2.amazonaws.com/avatars/avatar14.jpg",
  coursesTaken: 12,
  reviews: 2
}
```

**Code**: `400`
### Sample response ###
```json
Failed to fetch reviewer with id 1ee3dfcd8a0645a25a35977997223d22
```