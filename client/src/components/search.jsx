import React from 'react';

const Search = (props) => (
  <div>
    <input placeholder="Search reviews"></input>
    <select>
      <option value>All ratings</option>
      <option value="5">Five stars</option>
      <option value="4">Four stars</option>
      <option value="3">Three stars</option>
      <option value="2">Two stars</option>
      <option value="1">One star</option>
    </select>
  </div>
);

export default Search;