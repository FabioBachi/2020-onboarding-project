import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

it('should render correctly', () => {
  expect(shallow(<Header />).find('header').length).toBe(1);
});
