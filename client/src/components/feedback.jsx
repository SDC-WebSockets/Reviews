import React from 'react';

const Feedback = (props) => (
  <div>
    <h2>Student feedback</h2>
    <div>[overall rating]</div> {/* average of all ratings */}
    <div>[percentage of 5 stars]</div>
    <div>[percentage of 4 stars]</div>
    <div>[percentage of 3 stars]</div>
    <div>[percentage of 2 stars]</div>
    <div>[percentage of 1 star]</div>
  </div>
)

export default Feedback;