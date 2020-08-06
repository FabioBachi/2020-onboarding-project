import React from 'react';

interface Props {
  onChangeSorting: (event: React.FormEvent<HTMLSelectElement>) => void;
  selectedSorting?: string;
}

const Sort: React.SFC<Props> = ({
  onChangeSorting,
  selectedSorting,
}: Props) => (
  <div className="sort">
    <label htmlFor="sort">
      <div className="filter-label">Sort by</div>
      <select
        name="sorting"
        onChange={onChangeSorting}
        value={selectedSorting || 'popularity'}
      >
        <option value="popularity">Popularity</option>
        <option value="releaseDate">Release date</option>
      </select>
    </label>
  </div>
);

Sort.defaultProps = { selectedSorting: undefined };

export default Sort;
