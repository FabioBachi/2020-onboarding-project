import React from 'react';

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
  loading,
  genres,
  movies,
  selectedGenres,
  selectedSorting,
}: Props) => (
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

export default MovieSuggestions;
