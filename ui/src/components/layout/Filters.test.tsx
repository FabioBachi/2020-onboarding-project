import React from 'react';
import { shallow } from 'enzyme';
import Filters from './Filters';

it('should render correctly', () => {
  expect(
    shallow(
      <Filters
        genres={[
          {
            id: 1,
            title: 'Adventure',
          },
        ]}
      />
    ).find('#filters').length
  ).toBe(1);
});
