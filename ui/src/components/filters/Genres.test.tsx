import React from 'react';
import { shallow } from 'enzyme';
import Genres from './Genres';
import GenreButton from '../layout/GenreButton';

it('should have 3 selectable genres', () => {
  const wrapper = shallow(
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
  );

  expect(wrapper.find(GenreButton).length).toBe(3);
});

it('should warn that are no genres to show', () => {
  const wrapper = shallow(<Genres genres={[]} selectedGenres={[]} />);

  expect(wrapper.find('.no-items').exists()).toBe(true);
});
