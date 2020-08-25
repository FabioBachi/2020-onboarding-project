import React, { useEffect, useState } from 'react';

import { AlertDialog } from '@arterial/dialog';

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

const MovieSuggestions: React.FC<Props> = ({
  loading: loadingProps,
  genres,
  movies: moviesProps,
  selectedGenres,
  selectedSorting,
}: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(loadingProps);
  const [movies, setMovies] = useState<Array<Movie>>(moviesProps);

  // Executed only once
  useEffect(() => {
    // Listens to a onLoadMovies event to show them into the UI.
    window.addEventListener('onLoadMovies', (event: any) => {
      setMovies(event.detail.movies);
      setLoading(false);
    });

    // Listen to errors triggered by the Backbone app.
    window.addEventListener('onError', (event: any) => {
      setError(
        event.detail.message ||
          'Please check your connection and try again in a moment.'
      );
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

      <AlertDialog
        title="Ops, something went wrong."
        content={error}
        confirmingButtonLabel="Close"
        onClose={() => setError(null)}
        open={error !== null}
      />
    </div>
  );
};

export default MovieSuggestions;
