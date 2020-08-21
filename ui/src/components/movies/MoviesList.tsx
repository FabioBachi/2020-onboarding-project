import React from 'react';
import Movie from './Movie';

interface Props {
  movies: Movie[];
}

const Movies: React.FC<Props> = ({ movies }: Props) => {
  return movies && movies.length ? (
    <ul id="movies-list">
      {movies.map((movie: Movie) => (
        <Movie key={`movie-${movie.id}`} movie={movie} />
      ))}
    </ul>
  ) : (
    <div className="no-items">No movies found.</div>
  );
};

export default Movies;
