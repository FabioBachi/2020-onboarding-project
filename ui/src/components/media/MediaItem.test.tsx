import React from 'react';
import { shallow } from 'enzyme';
import MediaItem from './MediaItem';

it('should match media title', () => {
  const mediaTitle = 'Blade Runner 2049';

  const wrapper = shallow(
    <MediaItem
      media={{
        id: 1,
        voteAverage: 45,
        posterPath:
          'https://image.tmdb.org/t/p/w220_and_h330_face/jsMVRjLwKWN3gaiGd9pJUrxezsp.jpg',
        releaseDate: '12/03/2020',
        title: mediaTitle,
        url: 'https://www.themoviedb.org/movie/335984',
      }}
      key="media-1"
    />
  );

  expect(wrapper.find('h2').text()).toBe(mediaTitle);
});
