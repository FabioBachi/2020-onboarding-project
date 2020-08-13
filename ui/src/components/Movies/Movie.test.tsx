import React from 'react';
import { shallow } from 'enzyme';
import Movie from './Movie';

it('should match movie title', () => {
  const movieTitle = 'Blade Runner 2049';

  const wrapper = shallow(
    <Movie
      movie={{
        id: 1,
        voteAverage: 45,
        posterPath:
          'https://image.tmdb.org/t/p/w220_and_h330_face/jsMVRjLwKWN3gaiGd9pJUrxezsp.jpg',
        releaseDate: '12/03/2020',
        title: movieTitle,
        url: 'https://www.themoviedb.org/movie/335984',
      }}
      key="movie-1"
    />
  );

  expect(wrapper.find('h2').text()).toBe(movieTitle);
});
