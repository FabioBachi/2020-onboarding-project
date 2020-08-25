import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import store from '../../store';
import Genres from './Genres';
import GenreButton from '../layout/GenreButton';

it('should have 3 selectable genres', () => {
  const wrapper = mount(
    <Provider store={store}>
      <Genres
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
        selectedGenres={[]}
      />
    </Provider>
  );

  expect(wrapper.find(GenreButton).length).toBe(3);
});

it('should warn that are no genres to show', () => {
  const wrapper = mount(
    <Provider store={store}>
      <Genres genres={[]} selectedGenres={[]} />
    </Provider>
  );

  expect(wrapper.find('.no-items').exists()).toBe(true);
});
