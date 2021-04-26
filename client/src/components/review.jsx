import React from 'react';

const Review = (props) => ( // if a comment is more than 5 lines long, use the 'Show more' button
  <div>
    <div>[reviewer profile picture]</div>
    <div>[reviewer name]</div>
    <div>[rating]</div>
    <div>[createdAt]</div>
    <div>[comment]</div>
    <p>Was this review helpful?</p>
    <button className="thumbs-up">[thumbs-up]</button>
    <button className="thumbs-down">[thumbs-down]</button>
    <button className="report">Report</button>
  </div>
)

export default Review;