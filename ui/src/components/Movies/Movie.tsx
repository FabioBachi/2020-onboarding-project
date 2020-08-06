import React from 'react';

type Props = {
  movie: Movie;
};

const Movie: React.SFC<Props> = ({ movie }: Props) => (
  <li className="movie-item">
    <img alt={movie.title} src={movie.posterPath} />
    <div className="movie-info">
      <h2>{movie.title}</h2>
      <div className="movie-text">{`Release date: ${movie.releaseDate}`}</div>
      <div className="movie-text">{`${movie.popularity}%⭐`}</div>

      <a href={movie.url} target="_blank" rel="noreferrer" className="movie-bt">
        Open movie
      </a>
    </div>
  </li>
);

export default Movie;
