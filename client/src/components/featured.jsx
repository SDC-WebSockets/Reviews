import React from 'react';
import Review from './review.jsx';

const Featured = (props) => (
  <div>
    <h2>Featured review</h2>
    <div>[reviewer profile picture]</div>
    <div>[reviewer name]</div>
    <div>[reviewer coursesTaken]</div>
    <div>[reviewer reviews]</div>
    <div>[rating]</div>
    <div>[createdAt]</div>
    <div>[comment]</div>
    <p>Was this review helpful?</p>
    <button className="thumbs-up">[thumbs-up]</button>
    <button className="thumbs-down">[thumbs-down]</button>
    <button className="report">Report</button>
  </div>
)

export default Featured;