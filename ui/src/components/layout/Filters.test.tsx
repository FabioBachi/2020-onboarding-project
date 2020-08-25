import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import store from '../../store';
import Filters from './Filters';

it('should render correctly', () => {
  expect(
    mount(
      <Provider store={store}>
        <Filters
          genres={[
            {
              id: 1,
              name: 'Adventure',
            },
          ]}
        />
      </Provider>
    ).find('#filters').length
  ).toBe(1);
});
