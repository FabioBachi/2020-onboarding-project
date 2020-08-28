import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import store from '../../store';
import { toggleLoading } from '../../store/ducks/media';
import MediaItem from './MediaItem';
import MediaList from './MediaList';

it('should have 2 medias in the list', () => {
  store.dispatch(toggleLoading(false));

  const wrapper = mount(
    <Provider store={store}>
      <MediaList
        media={[
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
        ]}
      />
    </Provider>
  );

  expect(wrapper.find(MediaItem).length).toBe(2);
});

it('should warn that are no medias to show', () => {
  store.dispatch(toggleLoading(false));

  const wrapper = mount(
    <Provider store={store}>
      <MediaList media={[]} />
    </Provider>
  );

  expect(wrapper.find('.no-items').exists()).toBe(true);
});
