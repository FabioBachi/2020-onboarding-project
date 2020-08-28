import React from 'react';

import { Provider } from 'react-redux';

import './assets/scss/main.scss';

import MediaSuggestion from './MediaSuggestion';
import store from './store';

interface Props {
  genres: Genre[];
  media: Media[];
  selectedGenres: number[];
  selectedSorting: string;
}

const App: React.FC<Props> = ({
  genres,
  media,
  selectedGenres,
  selectedSorting,
}: Props) => {
  return (
    <Provider store={store}>
      <MediaSuggestion
        genres={genres}
        media={media}
        selectedGenres={selectedGenres}
        selectedSorting={selectedSorting}
      />
    </Provider>
  );
};

export default App;
