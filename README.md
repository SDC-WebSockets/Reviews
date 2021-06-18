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
This review service is a fullstack application for an item page modeled after the [Udemy](www.udemy.com) front end. It includes a database for storing reviews and ratings for 100 courses, an algorithm to generate random custom data, and a server/API that handles requests from other services. It replicates all the front-end logic for rendering and filtering reviews that is found on the Udemy web page.

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
