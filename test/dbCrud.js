var assert = require('assert');
const axios = require('axios');


describe('CRUD API', () => {
  let createdId;
  describe('Create', () => {
    it('should create a Review', (done) => {
      const date = new Date();
      const review = {
        courseId: 102,
        reviewer: {
          reviewerId: 123456,
          name: 'MackDaddy123',
          picture: 'rgb(77, 171, 101)',
          coursesTaken: 20,
          reviews: 2
        },
        rating: 3,
        comment: 'solid course',
        createdAt: date,
        helpful: 22,
        reported: false
      };

      axios({
        method: 'post',
        url: 'http://localhost:2712/reviews/item',
        data: review
      })
        .then((res) => {
          assert(res.status === 201);
          assert(res.data.courseId === review.courseId);
          assert(res.data.reviewer === 123456);
          assert(res.data.rating === 3);
          createdId = res.data._id;
          done();
        })
        .catch((err) => {
          console.error(err);
          done();
        });
    });
  });

  describe('Read', () => {
    let reviewCount;
    it('should read all reviews for one course', (done) => {
      axios({
        method: 'get',
        url: 'http://localhost:2712/reviews/item?courseId=102'
      })
        .then((res) => {
          assert(res.status === 200);
          assert(res.data.courseId === 102);
          assert(res.data.ratings.totalRatings > 0);
          assert(res.data.reviews.length > 0);
          reviewCount = res.data.reviews.length;
          done();
        })
        .catch((err) => {
          console.error(err);
          done();
        });
    });

    it('should read a given reviewer id', (done) => {
      axios({
        method: 'get',
        url: 'http://localhost:2712/reviews/reviewer/123456'
      })
        .then((res) => {
          assert(res.status === 200);
          assert(res.data.coursesTaken !== undefined);
          done();
        })
        .catch((err) => {
          console.error(err);
          done();
        });
    });

    it('should read an individual review by its ID and courseId', (done) => {
      axios({
        method: 'get',
        url: `http://localhost:2712/review/item?reviewerId=123456&courseId=102`
      })
        .then((res) => {
          assert(res.status === 200);
          assert(res.data.courseId === 102);

          done();
        })
        .catch((err) => {
          console.error(err);
          done();
        });
    });
  });

  describe('Update', () => {
    it('should update an individual reviewer', (done) => {
      axios({
        method: 'put',
        url: `http://localhost:2712/reviews/reviewer/123456`,
        data: {
          reviewerId: 123456
        }
      })
        .then((res) => {
          assert(res.status === 200);
          return axios({
            method: 'get',
            url: `http://localhost:2712/reviews/reviewer/123456`
          });
        })
        .then((res) => {

          assert(res.status === 200);
          assert(res.data.reviewerId === 123456);
          assert(res.data.coursesTaken === 15);
          done();
        })
        .catch((err) => {
          console.error(err);
          done();
        });
    });
  });

  describe('Delete', () => {
    it('should delete an individual review', (done) => {
      const review = {
        courseId: 102,
        reviewer: 123456,
        rating: 3,
        comment: 'solid course',
        helpful: 22,
        reported: false
      };
      axios({
        method: 'delete',
        url: `http://localhost:2712/reviews/item/102`,
        data: review
      })
        .then((res) => {
          assert(res.status === 200);
          return axios({
            method: 'get',
            url: `http://localhost:2712/review/item?reviewerId=123456&courseId=102`
          });
        })
        .then((res) => {
          assert(res.data === '');
          done();
        })
        .catch((err) => {
          console.error(err);
          done();
        });
    });
  });
});