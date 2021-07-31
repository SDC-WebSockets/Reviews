const { Sequelize, DataTypes } = require('sequelize');
const { Client, Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const createPostgresTables = async () => {
  const sequelize = new Sequelize(`postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@localhost:5432/udemy_reviews`);

  const Ratings = sequelize.define('ratings', {
    courseId: { type: DataTypes.INTEGER, primaryKey: true },
    overallRatings: { type: DataTypes.DOUBLE },
    totalRatings: { type: DataTypes.INTEGER },
    totalStars: { type: DataTypes.DOUBLE },
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
    id: { type: DataTypes.STRING(64), primaryKey: true },
    reviewer: {
      type: DataTypes.STRING(64),
      references: {
        model: Reviewers,
        key: 'reviewerId'
      }
    }
  }, { timestamps: false });

  await sequelize.sync();
  console.log('all tables were just synced in udemy_reviews');

  let returnObj = {
    sequelize,
    Ratings,
    Reviewers,
    Reviews
  };
  return returnObj;
};

const poppulatePostgresDB = async (refresh) => {
  console.log('starting postgres seeding');
  const pgURI = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@localhost:5432`;

  // Create db
  if (refresh) {
    const client = new Client({
      connectionString: pgURI
    });
    client.connect();
    await client.query('CREATE DATABASE IF NOT EXISTS udemy_reviews')
      .catch(async () => {
        console.log('DATABASE  already exists');
        await client.query('DROP DATABASE udemy_reviews');
        throw 'create db';
      })
      .catch(() => client.query('CREATE DATABASE udemy_reviews'));

    await createPostgresTables();
  }

  const pool = new Pool({
    host: 'localhost',
    database: 'udemy_reviews'
  });

  await pool.query(`COPY ratings FROM '${path.join(__dirname, '..', '/ratings7.0.csv')}' DELIMITER ',' CSV HEADER`);
  console.log('wrote ratings');
  await pool.query(`COPY reviewers FROM '${path.join(__dirname, '..', '/reviewers7.0.csv')}' DELIMITER '|' CSV HEADER`);
  console.log('wrote reviewers');
  await pool.query(`COPY reviews FROM '${path.join(__dirname, '..', '/reviews7.0.csv')}' DELIMITER ',' CSV HEADER`);
  console.log('wrote reviews');
}

poppulatePostgresDB();