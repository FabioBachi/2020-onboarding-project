import React from 'react';
import { shallow } from 'enzyme';
import Movie from './Movie';
import MoviesList from './MoviesList';

it('should have 3 selectable genres', () => {
  const wrapper = shallow(
    <MoviesList
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
          id: 1,
          voteAverage: 45,
          posterPath:
            'https://image.tmdb.org/t/p/w220_and_h330_face/jsMVRjLwKWN3gaiGd9pJUrxezsp.jpg',
          releaseDate: '12/03/2020',
          title: 'Blade Runner 2049',
          url: 'https://www.themoviedb.org/movie/335984',
        },
      ]}
    />
  );

  expect(wrapper.find(Movie).length).toBe(2);
});

it('should warn that are no genres to show', () => {
  const wrapper = shallow(<MoviesList movies={[]} />);

  expect(wrapper.find('.no-items').exists()).toBe(true);
});
