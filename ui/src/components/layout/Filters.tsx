import React from 'react';
import { connect } from 'react-redux';

import { Creators } from '../../store/ducks/movies';

import Genres from '../filters/Genres';
import Sort from '../filters/Sort';

interface FiltersProps {
  genres: Genre[];
  selectedGenres?: number[];
  selectedSorting?: string;
}

const mapDispatchToProps = {
  changeSorting: Creators.changeSorting,
  toggleLoading: Creators.toggleLoading,
};

type Props = FiltersProps & typeof mapDispatchToProps;

const Filters: React.FC<Props> = ({
  genres,
  selectedGenres,
  selectedSorting,
  ...props
}: Props) => {
  const onChangeSorting = (event: React.FormEvent<HTMLSelectElement>) => {
    window.dispatchEvent(
      new CustomEvent('onChangeSorting', {
        detail: { sortBy: event.currentTarget.value },
      })
    );

    props.changeSorting(event.currentTarget.value);
    props.toggleLoading(true);
  };

  return (
    <div id="filters">
      <Genres
        genres={genres}
        selectedGenres={selectedGenres}
        selectedSorting={selectedSorting}
      />
      <Sort
        onChangeSorting={onChangeSorting}
        selectedSorting={selectedSorting}
      />
    </div>
  );
};

Filters.defaultProps = { selectedGenres: [], selectedSorting: undefined };

const mapStateToProps = ({ movies }: StoreState) => ({
  selectedSorting: movies.selectedSorting,
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
