import React from 'react';

import './assets/scss/main.scss';

import Filters from './components/layout/Filters';
import Header from './components/layout/Header';

export default function src() {
  return (
    <div id="container">
      <Header />
      <Filters />
    </div>
  );
}
