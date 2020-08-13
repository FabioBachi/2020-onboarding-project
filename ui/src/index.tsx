import React from 'react';
import { render } from 'react-dom';

import MovieSuggestion from './MovieSuggestion';

render(
  <MovieSuggestion
    genres={[
      {
        id: 1,
        name: 'Adventure',
      },
      {
        id: 2,
        name: 'Horror',
      },
      {
        id: 3,
        name: 'Science Fiction',
      },
    ]}
    loading={false}
    movies={[
      {
        id: 1,
        voteAverage: 45,
        posterPath:
          'https://image.tmdb.org/t/p/w220_and_h330_face/jsMVRjLwKWN3gaiGd9pJUrxezsp.jpg',
        releaseDate: '12/03/2020',
        title: 'Blade Runner 2049',
        url: 'https://www.themoviedb.org/movie/335984',
      },
      {
        id: 2,
        voteAverage: 45,
        posterPath:
          'https://image.tmdb.org/t/p/w220_and_h330_face/jsMVRjLwKWN3gaiGd9pJUrxezsp.jpg',
        releaseDate: '12/03/2020',
        title: 'Blade Runner 2049',
        url: 'https://www.themoviedb.org/movie/335984',
      },
      {
        id: 3,
        voteAverage: 45,
        posterPath:
          'https://image.tmdb.org/t/p/w220_and_h330_face/jsMVRjLwKWN3gaiGd9pJUrxezsp.jpg',
        releaseDate: '12/03/2020',
        title: 'Blade Runner 2049',
        url: 'https://www.themoviedb.org/movie/335984',
      },
      {
        id: 4,
        voteAverage: 45,
        posterPath:
          'https://image.tmdb.org/t/p/w220_and_h330_face/jsMVRjLwKWN3gaiGd9pJUrxezsp.jpg',
        releaseDate: '12/03/2020',
        title: 'Blade Runner 2049',
        url: 'https://www.themoviedb.org/movie/335984',
      },
      {
        id: 5,
        voteAverage: 45,
        posterPath:
          'https://image.tmdb.org/t/p/w220_and_h330_face/jsMVRjLwKWN3gaiGd9pJUrxezsp.jpg',
        releaseDate: '12/03/2020',
        title: 'Blade Runner 2049',
        url: 'https://www.themoviedb.org/movie/335984',
      },
      {
        id: 6,
        voteAverage: 45,
        posterPath:
          'https://image.tmdb.org/t/p/w220_and_h330_face/jsMVRjLwKWN3gaiGd9pJUrxezsp.jpg',
        releaseDate: '12/03/2020',
        title: 'Blade Runner 2049',
        url: 'https://www.themoviedb.org/movie/335984',
      },
      {
        id: 7,
        voteAverage: 45,
        posterPath:
          'https://image.tmdb.org/t/p/w220_and_h330_face/jsMVRjLwKWN3gaiGd9pJUrxezsp.jpg',
        releaseDate: '12/03/2020',
        title: 'Blade Runner 2049',
        url: 'https://www.themoviedb.org/movie/335984',
      },
      {
        id: 8,
        voteAverage: 45,
        posterPath:
          'https://image.tmdb.org/t/p/w220_and_h330_face/jsMVRjLwKWN3gaiGd9pJUrxezsp.jpg',
        releaseDate: '12/03/2020',
        title: 'Blade Runner 2049',
        url: 'https://www.themoviedb.org/movie/335984',
      },
    ]}
    selectedGenres={[1, 3]}
    selectedSorting="voteAverage"
  />,
  document.getElementById('root')
);
