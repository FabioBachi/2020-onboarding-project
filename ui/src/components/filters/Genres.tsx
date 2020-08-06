import React from 'react';

import GenreButton from '../layout/GenreButton';

interface Props {
  genres: Genre[];
  selectedGenres: number[];
}

const Genres: React.SFC<Props> = ({ genres, selectedGenres }: Props) => {
  const onToggleGenre: Function = (id: number): void => {
    console.log(id);
  };

  return (
    <div className="genres">
      {genres && genres.length ? (
        <>
          <div className="filter-label">Select genres</div>

          <div className="genres-list">
            {genres.map((genre) => (
              <GenreButton
                id={genre.id}
                onToggleGenre={onToggleGenre}
                selected={selectedGenres.indexOf(genre.id) >= 0}
                title={genre.title}
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

export default Genres;
