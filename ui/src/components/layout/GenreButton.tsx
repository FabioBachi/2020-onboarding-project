import React from 'react';
import classNames from 'classnames';

const GenreButton: React.SFC<GenreButton> = ({
  id,
  onToggleGenre,
  selected,
  title,
}: GenreButton) => (
  <button
    type="button"
    onClick={() => onToggleGenre(id)}
    className={classNames('genre-button', { selected })}
  >
    {title}
  </button>
);

export default GenreButton;
