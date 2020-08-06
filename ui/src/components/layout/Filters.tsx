import React from 'react';

import Genres from '../filters/Genres';
import Sort from '../filters/Sort';

interface Props {
  genres: Genre[];
  selectedGenres: number[];
  selectedSorting: string;
}

const Filters: React.SFC<Props> = ({
  genres,
  selectedGenres,
  selectedSorting,
}: Props) => (
  <div id="filters">
    <Genres genres={genres} selectedGenres={selectedGenres} />
    <Sort selectedSorting={selectedSorting} />
  </div>
);

export default Filters;
