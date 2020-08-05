import React from 'react';

export default () => (
  <div className="sort">
    <label htmlFor="sort">
      <div className="filter-label">Sort by</div>
      <select name="sorty">
        <option value="popularity.desc">Popularity</option>
        <option value="release_date.desc">Release date</option>
      </select>
    </label>
  </div>
);
