import React from 'react';

import './assets/scss/main.scss';

import Filters from './components/layout/Filters';
import Header from './components/layout/Header';
import MoviesList from './components/Movies/MoviesList';

export default function src() {
  return (
    <div id="container">
      <Header />
      <Filters />
      <MoviesList
        movies={[
          {
            id: 1,
            popularity: 45,
            posterPath:
              'https://image.tmdb.org/t/p/w220_and_h330_face/jsMVRjLwKWN3gaiGd9pJUrxezsp.jpg',
            releaseDate: '12/03/2020',
            title: 'Blade Runner 2049',
            url: 'https://www.themoviedb.org/movie/335984',
          },
          {
            id: 2,
            popularity: 45,
            posterPath:
              'https://image.tmdb.org/t/p/w220_and_h330_face/jsMVRjLwKWN3gaiGd9pJUrxezsp.jpg',
            releaseDate: '12/03/2020',
            title: 'Blade Runner 2049',
            url: 'https://www.themoviedb.org/movie/335984',
          },
          {
            id: 3,
            popularity: 45,
            posterPath:
              'https://image.tmdb.org/t/p/w220_and_h330_face/jsMVRjLwKWN3gaiGd9pJUrxezsp.jpg',
            releaseDate: '12/03/2020',
            title: 'Blade Runner 2049',
            url: 'https://www.themoviedb.org/movie/335984',
          },
          {
            id: 4,
            popularity: 45,
            posterPath:
              'https://image.tmdb.org/t/p/w220_and_h330_face/jsMVRjLwKWN3gaiGd9pJUrxezsp.jpg',
            releaseDate: '12/03/2020',
            title: 'Blade Runner 2049',
            url: 'https://www.themoviedb.org/movie/335984',
          },
          {
            id: 5,
            popularity: 45,
            posterPath:
              'https://image.tmdb.org/t/p/w220_and_h330_face/jsMVRjLwKWN3gaiGd9pJUrxezsp.jpg',
            releaseDate: '12/03/2020',
            title: 'Blade Runner 2049',
            url: 'https://www.themoviedb.org/movie/335984',
          },
          {
            id: 6,
            popularity: 45,
            posterPath:
              'https://image.tmdb.org/t/p/w220_and_h330_face/jsMVRjLwKWN3gaiGd9pJUrxezsp.jpg',
            releaseDate: '12/03/2020',
            title: 'Blade Runner 2049',
            url: 'https://www.themoviedb.org/movie/335984',
          },
          {
            id: 7,
            popularity: 45,
            posterPath:
              'https://image.tmdb.org/t/p/w220_and_h330_face/jsMVRjLwKWN3gaiGd9pJUrxezsp.jpg',
            releaseDate: '12/03/2020',
            title: 'Blade Runner 2049',
            url: 'https://www.themoviedb.org/movie/335984',
          },
          {
            id: 8,
            popularity: 45,
            posterPath:
              'https://image.tmdb.org/t/p/w220_and_h330_face/jsMVRjLwKWN3gaiGd9pJUrxezsp.jpg',
            releaseDate: '12/03/2020',
            title: 'Blade Runner 2049',
            url: 'https://www.themoviedb.org/movie/335984',
          },
        ]}
      />
    </div>
  );
}
