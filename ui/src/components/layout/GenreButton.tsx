import React from 'react';
import classNames from 'classnames';

interface GenreButton {
  onToggleGenre: Function;
  selected: boolean;
}

type Props = Genre & GenreButton;

const GenreButton: React.SFC<Props> = ({
  id,
  onToggleGenre,
  selected,
  title,
}: Props) => (
  <button
    type="button"
    onClick={() => onToggleGenre(id)}
    className={classNames('genre-button', { selected })}
  >
    {title}
  </button>
);

export default GenreButton;
