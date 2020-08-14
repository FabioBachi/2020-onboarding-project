import React, { useEffect, useState } from 'react';

import './assets/scss/main.scss';

import Filters from './components/layout/Filters';
import Header from './components/layout/Header';
import MoviesList from './components/movies/MoviesList';

interface Props {
  genres: Genre[];
  loading: boolean;
  movies: Movie[];
  selectedGenres: number[];
  selectedSorting: string;
}

const MovieSuggestions: React.SFC<Props> = ({
  loading: loadingProps,
  genres,
  movies: moviesProps,
  selectedGenres,
  selectedSorting,
}: Props) => {
  const [loading, setLoading] = useState(loadingProps);
  const [movies, setMovies] = useState(moviesProps);

  useEffect(() => {
    window.addEventListener('onLoadMovies', (event: any) => {
      setMovies(event.detail.movies);
      setLoading(false);
    });
  }, []);

  return (
    <div id="movie-suggestion">
      <Header />
      <Filters
        genres={genres}
        selectedGenres={selectedGenres}
        selectedSorting={selectedSorting}
      />
      {!loading ? (
        <MoviesList movies={movies} />
      ) : (
        <div className="loading">Loading ...</div>
      )}
    </div>
  );
};

export default MovieSuggestions;
