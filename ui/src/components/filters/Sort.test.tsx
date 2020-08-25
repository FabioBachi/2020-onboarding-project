import React from 'react';
import { shallow } from 'enzyme';
import Sort from './Sort';

it('should dispatch onChange', () => {
  const onChangeSorting = jest.fn();

  const wrapper = shallow(<Sort onChangeSorting={onChangeSorting} />);
  wrapper.find('select').simulate('change');

  expect(onChangeSorting).toBeCalled();
});

it('should have two options only', () => {
  const wrapper = shallow(<Sort onChangeSorting={() => {}} />);
  expect(wrapper.find('option').length).toBe(3);
});
