import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MovieSuggestion from './MovieSuggestion';
import * as styles from './assets/scss/main.scss';

export default class MovieSuggestionElement extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');

    const style = document.createElement('style');
    style.type = 'text/css';
    style.append(styles);

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(mountPoint);
    shadowRoot.appendChild(style);

    ReactDOM.render(
      React.createElement(
        MovieSuggestion,
        {
          genres: [],
          isLoading: false,
          movies: [],
          selectedGenres: [],
          selectedSorting: 'popularity',
        },
        React.createElement('slot')
      ),
      mountPoint
    );
  }
}

window.customElements.define('movie-suggestion', MovieSuggestionElement);
