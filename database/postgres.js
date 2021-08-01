const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();


const sequelize = new Sequelize(`postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@localhost:5432/udemy_reviews`);

const Ratings = sequelize.define('ratings', {
  courseId: { type: DataTypes.INTEGER, primaryKey: true },
  totalRatings: { type: DataTypes.INTEGER },
  totalStars: { type: DataTypes.DOUBLE },
  // overallRatings: { type: 'DOUBLE PRECISION GENERATED ALWAYS AS ("totalStars" / "totalRatings") STORED' },
  overallRatings: { type: DataTypes.DOUBLE },
  five: { type: DataTypes.INTEGER },
  fourhalf: { type: DataTypes.INTEGER },
  four: { type: DataTypes.INTEGER },
  threehalf: { type: DataTypes.INTEGER },
  three: { type: DataTypes.INTEGER },
  twohalf: { type: DataTypes.INTEGER },
  two: { type: DataTypes.INTEGER },
  onehalf: { type: DataTypes.INTEGER },
  one: { type: DataTypes.INTEGER },
}, { timestamps: false });

const Reviewers = sequelize.define('reviewers', {
  reviewerId: { type: DataTypes.STRING(64), primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  picture: { type: DataTypes.STRING, allowNull: false },
  coursesTaken: { type: DataTypes.INTEGER, allowNull: false },
  reviews: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: false });

const Reviews = sequelize.define('reviews', {
  id: { type: DataTypes.STRING(64), primaryKey: true },
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: Ratings,
      key: 'courseId'
    }
  },
  rating: { type: DataTypes.DOUBLE, allowNull: false },
  comment: { type: DataTypes.STRING(4000) },
  createdAt: { type: DataTypes.STRING(64) },
  helpful: { type: DataTypes.INTEGER },
  reported: { type: DataTypes.BOOLEAN },
  reviewer: {
    type: DataTypes.STRING(64),
    references: {
      model: Reviewers,
      key: 'reviewerId'
    }
  }
}, { timestamps: false });

module.exports.sequelize = sequelize;
module.exports.Reviews = Reviews;
module.exports.Reviewers = Reviewers;
module.exports.Ratings = Ratings;