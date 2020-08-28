import React from 'react';
import MediaTypeSelector from './MediaTypeSelector';

const Header: React.FC = () => (
  <header id="header">
    <h1>2020 Onboarding Project</h1>
    <MediaTypeSelector />
    <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
      themoviedb.org
    </a>
  </header>
);

export default Header;
