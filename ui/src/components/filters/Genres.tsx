import React from 'react';
import classNames from 'classnames';

import GenreButton from '../layout/GenreButton';

interface Props {
  genres: Genre[];
  selectedGenres?: number[];
  selectedSorting?: string;
}

const Genres: React.FC<Props> = ({
  genres,
  selectedGenres,
  selectedSorting,
}: Props) => {
  const onToggleGenre: Function = (genre: Genre): void => {
    window.dispatchEvent(
      new CustomEvent('onToggleGenre', { detail: { genre } })
    );
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

export default Genres;
