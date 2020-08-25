import React from 'react';

import { Provider } from 'react-redux';

import './assets/scss/main.scss';

import MovieSuggestion from './MovieSuggestion';
import store from './store';

interface Props {
  genres: Genre[];
  movies: Movie[];
  selectedGenres: number[];
  selectedSorting: string;
}

const App: React.FC<Props> = ({
  genres,
  movies,
  selectedGenres,
  selectedSorting,
}: Props) => {
  return (
    <Provider store={store}>
      <MovieSuggestion
        genres={genres}
        movies={movies}
        selectedGenres={selectedGenres}
        selectedSorting={selectedSorting}
      />
    </Provider>
  );
};

export default App;
