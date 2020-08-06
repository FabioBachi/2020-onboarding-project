import React from 'react';
import { shallow } from 'enzyme';
import GenreButton from './GenreButton';

it('should dispatch onClick', () => {
  const onToggleGenre = jest.fn();

  const wrapper = shallow(
    <GenreButton
      id={1}
      key={'genre-1'}
      onToggleGenre={onToggleGenre}
      selected
      title={'Genre title'}
    />
  );

  wrapper.find('button.genre-button').simulate('click');

  expect(onToggleGenre).toBeCalled();
});

it('should match genre title', () => {
  const genreTitle = 'Science Fiction';

  const wrapper = shallow(
    <GenreButton
      id={1}
      key={'genre-1'}
      onToggleGenre={() => {}}
      selected
      title={genreTitle}
    />
  );

  expect(wrapper.find('button.genre-button').text()).toBe(genreTitle);
});

it('should have "selected" css class', () => {
  const genreTitle = 'Science Fiction';

  const wrapper = shallow(
    <GenreButton
      id={1}
      key={'genre-1'}
      onToggleGenre={() => {}}
      selected
      title={genreTitle}
    />
  );

  expect(wrapper.find('button.genre-button').prop('className')).toMatch(
    /selected/
  );
});
