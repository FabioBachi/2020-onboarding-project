import React from 'react';
import classNames from 'classnames';

interface GenreButton {
  genre: Genre;
  onToggleGenre: Function;
  selected: boolean;
}

const GenreButton: React.SFC<GenreButton> = ({
  genre,
  onToggleGenre,
  selected,
}: GenreButton) => (
  <button
    type="button"
    onClick={() => onToggleGenre(genre)}
    className={classNames('genre-button', { selected })}
  >
    {genre.name}
  </button>
);

export default GenreButton;
