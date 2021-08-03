var assert = require('assert');
const axios = require('axios');


describe('CRUD API', () => {
  let reviewId;
  const date = new Date();
  const review = {
    courseId: 1000001,
    reviewer: '123abc',
    rating: 3,
    comment: 'solid course',
    createdAt: date,
    helpful: 22,
    reported: false
  };
  const reviewer = {
    reviewerId: '123abc',
    name: 'MackDaddy123',
    picture: 'rgb(77, 171, 101)'
  };

  describe('Create', () => {
    it('should create a Course', (done) => {
      axios({
        method: 'post',
        url: `http://localhost:2712/reviews/item/${review.courseId}`
      })
        .then(res => {
          assert(res.status === 201);
          assert(res.data.overallRatings === 0);
          done();
        });
    });

    it('should create a Reviewer', (done) => {
      axios({
        method: 'post',
        url: `http://localhost:2712/reviews/reviewer/${reviewer.reviewerId}`,
        data: reviewer
      })
        .then(res => {
          assert(res.status === 201);
          assert(res.data.reviewerId === '123abc');
          assert(res.data.reviews === 0);
          done();
        });
    });

    it('should create a Review', (done) => {
      axios({
        method: 'post',
        url: `http://localhost:2712/reviews/item/${review.courseId}/review/0`,
        data: review
      })
        .then(res => {
          assert(res.status === 201);
          assert(res.data.id !== undefined);
          reviewId = res.data.id;
          done();
        });
    });
  });

  describe('Read', () => {
    it('should read a given reviewer id', (done) => {
      axios({
        method: 'get',
        url: 'http://localhost:2712/reviews/reviewer/123abc'
      })
        .then((res) => {
          assert(res.status === 200);
          assert(res.data.coursesTaken === 1);
          done();
        })
        .catch((err) => {
          console.error(err);
          done();
        });
    });

    it('should read an individual review by its ID', (done) => {
      axios({
        method: 'get',
        url: `http://localhost:2712/reviews/item/${review.courseId}/review/${reviewId}`
      })
        .then((res) => {
          assert(res.status === 200);
          assert(res.data.courseId === review.courseId);
          done();
        });
    });

    it('should read a course with all associated data', (done) => {
      axios({
        method: 'get',
        url: `http://localhost:2712/reviews/item/${review.courseId}`
      })
        .then(res => {
          assert(res.status === 200);
          assert(res.data.courseId === review.courseId);
          assert(res.data.ratings.totalRatings === 1);
          done();
        });
    });
  });

  describe('Update', () => {
    it('should update an individual review', (done) => {
      axios({
        method: 'put',
        url: `http://localhost:2712/reviews/item/${review.courseId}/review/${reviewId}`,
        data: {
          rating: 4
        }
      })
        .then((res) => {
          assert(res.status === 200);
          assert(res.data.updated === 1);
          done();
        });
    });
  });

  describe('Delete', () => {
    it('should delete an individual review', (done) => {
      axios({
        method: 'delete',
        url: `http://localhost:2712/reviews/item/${review.courseId}/review/${reviewId}`,
        data: review
      })
        .then((res) => {
          assert(res.status === 200);
          return axios({
            method: 'get',
            url: `http://localhost:2712/reviews/item/${review.courseId}/review/${reviewId}`
          });
        })
        .then((res) => {
          assert(res.data === '');
          done();
        });
    });
  });
});