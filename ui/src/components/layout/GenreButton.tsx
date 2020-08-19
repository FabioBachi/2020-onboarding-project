import React, { useState } from 'react';
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
}: GenreButton) => {
  const [isSelected, setSelected] = useState(selected);

  return (
    <button
      type="button"
      onClick={() => {
        setSelected(!isSelected);
        onToggleGenre(genre);
      }}
      className={classNames('genre-button', { selected: isSelected })}
    >
      {genre.name}
    </button>
  );
};

export default GenreButton;
