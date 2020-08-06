import React from 'react';

interface Props {
  selectedSorting: string;
}

const Sort: React.SFC<Props> = ({ selectedSorting }: Props) => (
  <div className="sort">
    <label htmlFor="sort">
      <div className="filter-label">Sort by</div>
      <select name="sorting">
        <option
          value="popularity"
          selected={!selectedSorting || selectedSorting === 'popularity'}
        >
          Popularity
        </option>
        <option
          value="release_date"
          selected={selectedSorting === 'releaseDate'}
        >
          Release date
        </option>
      </select>
    </label>
  </div>
);

export default Sort;
