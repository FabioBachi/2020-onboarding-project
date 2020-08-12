import React from 'react';
import { shallow } from 'enzyme';
import GenreButton from './GenreButton';

it('should dispatch onClick', () => {
  const onToggleGenre = jest.fn();

  const wrapper = shallow(
    <GenreButton
      genre={{ id: 1, name: 'Genre name' }}
      key="genre-1"
      onToggleGenre={onToggleGenre}
      selected
    />
  );

  wrapper.find('button.genre-button').simulate('click');

  expect(onToggleGenre).toBeCalled();
});

it('should match genre name', () => {
  const genreName = 'Science Fiction';

  const wrapper = shallow(
    <GenreButton
      genre={{ id: 1, name: genreName }}
      key="genre-1"
      onToggleGenre={() => {}}
      selected
    />
  );

  expect(wrapper.find('button.genre-button').text()).toBe(genreName);
});

it('should have "selected" css class', () => {
  const genreName = 'Science Fiction';

  const wrapper = shallow(
    <GenreButton
      genre={{ id: 1, name: genreName }}
      key="genre-1"
      onToggleGenre={() => {}}
      selected
    />
  );

  expect(wrapper.find('button.genre-button').prop('className')).toMatch(
    /selected/
  );
});
