import React from 'react';

const Review = (props) => (
  <div>
    <div>[reviewer profile picture]</div>
    <div>[reviewer name]</div>
    <div>[rating]</div>
    <div>[createdAt]</div>
    <div>[comment]</div>
    <div>Was this review helpful?</div>
    <button className="thumbs-up">[thumbs-up]</button>
    <button className="thumbs-down">[thumbs-down]</button>
    <button className="report">Report</button>
  </div>
)

export default Review;