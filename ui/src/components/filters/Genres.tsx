import React from 'react';

import GenreButton from '../layout/GenreButton';

interface Props {
  genres: Genre[];
  selectedGenres?: number[];
}

const Genres: React.FC<Props> = ({ genres, selectedGenres }: Props) => {
  const onToggleGenre: Function = (genre: Genre): void => {
    window.dispatchEvent(
      new CustomEvent('onToggleGenre', { detail: { genre } })
    );
  };

  return (
    <div className="genres">
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

Genres.defaultProps = { selectedGenres: [] };

export default Genres;
