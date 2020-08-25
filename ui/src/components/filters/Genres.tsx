import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import GenreButton from '../layout/GenreButton';
import { Creators } from '../../store/ducks/movies';

interface GenresProps {
  genres: Genre[];
  selectedGenres?: number[];
  selectedSorting?: string;
}

const mapDispatchToProps = { toggleLoading: Creators.toggleLoading };

type Props = GenresProps & typeof mapDispatchToProps;

const Genres: React.FC<Props> = ({
  genres,
  selectedGenres,
  selectedSorting,
  ...props
}: Props) => {
  const onToggleGenre: Function = (genre: Genre): void => {
    window.dispatchEvent(
      new CustomEvent('onToggleGenre', { detail: { genre } })
    );

    props.toggleLoading(true);
  };

  return (
    <div
      className={classNames('genres', {
        blocked: selectedSorting === 'trending',
      })}
      title={
        selectedSorting === 'trending'
          ? 'Filtering by genres is not supported when using the Trending sorting option.'
          : ''
      }
    >
      {genres && genres.length ? (
        <>
          <div className="filter-label">Select genres</div>

          <div className="genres-list">
            {genres.map((genre) => (
              <GenreButton
                genre={genre}
                key={`genre-${genre.id}`}
                onToggleGenre={onToggleGenre}
                selected={
                  selectedSorting !== 'trending' &&
                  selectedGenres !== undefined &&
                  selectedGenres.indexOf(genre.id) >= 0
                }
              />
            ))}
          </div>
        </>
      ) : (
        <div className="no-items">No movie genres found.</div>
      )}
    </div>
  );
};

Genres.defaultProps = { selectedGenres: [], selectedSorting: undefined };

export default connect(undefined, mapDispatchToProps)(Genres);
