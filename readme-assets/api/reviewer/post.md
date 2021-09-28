# POST reviewer
Add a new reviewer

**URL**: `/reviews/reviewer/:reviewerId`

**Method**: `POST`

## Request ##
### Path params ###
`reviewerId`: Integer, Required

### body ###
Required
```json
{
  reviewerId: "1ee3dfcd8a0645a25a35977997223d22",
  name: "Lynne Wuckert",
  picture: "https://rpt27-sdc-websockets.s3.us-west-2.amazonaws.com/avatars/avatar14.jpg",
  coursesTaken: 0,
  reviews: 0
}
```
## Response ##
**Code**: `200 OK`

### Sample response ###
```json
{
  reviewerId: "1ee3dfcd8a0645a25a35977997223d22",
  name: "Lynne Wuckert",
  picture: "https://rpt27-sdc-websockets.s3.us-west-2.amazonaws.com/avatars/avatar14.jpg",
  coursesTaken: 0,
  reviews: 0
}
```

**Code**: `400`
### Sample response ###
```json
Failed to create reviewer with id 1ee3dfcd8a0645a25a35977997223d22
```