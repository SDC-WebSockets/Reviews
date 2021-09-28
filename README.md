# Review Service
Reviews for Udemy Clone (Front End Capstone project by Hack Reactor RPT27 team Charlotte Badger https://github.com/Charlotte-Badger)

## Related Projects
- [Course Content](https://github.com/Charlotte-Badger/Course-Content) (Kyle Johnson)
- [Overview](https://github.com/Charlotte-Badger/Overview) (Eric Knechtges)
- [Sidebar](https://github.com/Charlotte-Badger/Sidebar) (Jason Carini)
- [Author](https://github.com/Charlotte-Badger/Author) (Eric Knechtges)
- [Proxy](https://github.com/Charlotte-Badger/udemy-proxy-carinij) (Jason Carini, with some help from KJ, EK, and FR)

## Table of Contents
1. [Description](#description)
2. [Technologies](#technologies)
3. [Requirements](#requirements)
4. [Installation](#installation)

## Description
This review service is a fullstack application for an item page modeled after the [Udemy](www.udemy.com) front end. It includes a database for storing reviews and ratings for 10 million courses  a server/API that can handle up to 850 requests per second.

### Featured Review feature
If a course has at least ten reviews, the app chooses a Feature Review and renders it at a higher point in the page:

<img src="readme-assets/featuredScreenshot.png" width="600">

<img src="readme-assets/featured.gif" width="600">

### Feedback feature
The Student Feedback section renders the current course's ratings, and allows the user to search reviews by clicking on star tiers, entering a search term, or both:

<img src="readme-assets/feedbackScreenshot.png" width="600">

- Filtering reviews by star tier:

<img src="readme-assets/filterByTier.gif" width="600">

- Filtering reviews by search:

<img src="readme-assets/filterBySearch.gif" width="600">

### Reviews feature
List of reviews for current course (displays the first twelve reviews by default):

<img src="readme-assets/reviewListScreenshot1.png" width="600">

"See More" button (displays twelve more reviews):

<img src="readme-assets/reviewList.gif" width="600">

## Technologies
- AWS EC2 (deployment)
- AWS S3 (bundle storage)
- Babel
- Express (server)
- Jest & Enzyme (testing)
- MongoDB & Mongoose (database)
- Node.js
- React & ReactDOM (front end)
- Styled Components (styling)
- Webpack

## API Endpoints
- GET `/reviews/item/:courseId`
  > Request
    > path params:
      > courseId: Integer, Required
  > Response
    > 200 OK
    > application/json
    > Sample Response: 
      > ```
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
        ] ```
  
- POST `/reviews/item`
- PUT `/reviews/item/:id`
- DELETE `/reviews/item/:id`

## Requirements
- Node 6.13.0

## Installation
### Installing dependencies
From within the Reviews directory:
```sh
npm install
```
### Creating the bundle file
From within the Reviews directory:
```sh
npm run build (development mode)
npm run prod (production mode)
```
### Populating the database
From within the Reviews directory:
```sh
npm run seedMongo
```
### Starting the server
From within the Reviews directory:
```sh
npm start
```
### Running tests (optional)
```sh
npm test
```
