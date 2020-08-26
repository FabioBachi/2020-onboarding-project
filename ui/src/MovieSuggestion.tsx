import React, { useEffect, useState } from 'react';
import { AlertDialog } from '@arterial/dialog';
import { connect } from 'react-redux';

import './assets/scss/main.scss';

import Filters from './components/layout/Filters';
import Header from './components/layout/Header';
import MoviesList from './components/movies/MoviesList';
import { Creators } from './store/ducks/movies';

interface MovieProps {
  genres: Genre[];
  movies: Movie[];
  selectedGenres: number[];
  selectedSorting: string;
}

const mapDispatchToProps = {
  changeSorting: Creators.changeSorting,
  toggleLoading: Creators.toggleLoading,
};

type Props = MovieProps & typeof mapDispatchToProps;

const MovieSuggestion: React.FC<Props> = ({
  genres,
  movies: moviesProps,
  selectedGenres,
  selectedSorting,
  ...props
}: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [movies, setMovies] = useState<Array<Movie>>(moviesProps);

  // Executed only once
  useEffect(() => {
    props.changeSorting(selectedSorting);

    // Listens to a onLoadMovies event to show them into the UI.
    window.addEventListener('onLoadMovies', (event: any) => {
      setMovies(event.detail.movies);
      props.toggleLoading(false);
    });

    // Listen to errors triggered by the Backbone app.
    window.addEventListener('onError', (event: any) => {
      setError(
        event.detail && event.detail.message
          ? event.detail.message
          : 'Please check your connection and try again in a moment.'
      );
      props.toggleLoading(false);
    });
  }, []);

  return (
    <div id="movie-suggestion">
      <Header />
      <Filters genres={genres} selectedGenres={selectedGenres} />
      <MoviesList movies={movies} />

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

export default connect(undefined, mapDispatchToProps)(MovieSuggestion);
