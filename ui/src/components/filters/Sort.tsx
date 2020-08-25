import React from 'react';

interface Props {
  onChangeSorting: (event: React.FormEvent<HTMLSelectElement>) => void;
  selectedSorting?: string;
}

const Sort: React.FC<Props> = ({ onChangeSorting, selectedSorting }: Props) => (
  <div className="sort">
    <label htmlFor="sort">
      <div className="filter-label">Sort by</div>
      <select
        name="sorting"
        onChange={onChangeSorting}
        value={selectedSorting || 'voteAverage'}
      >
        <option value="releaseDate">Release date</option>
        <option value="trending">Trending</option>
        <option value="voteAverage">Vote average</option>
      </select>
    </label>
  </div>
);

Sort.defaultProps = { selectedSorting: undefined };

export default Sort;
