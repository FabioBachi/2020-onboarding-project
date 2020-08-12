import * as React from 'react';
import * as ReactDOM from 'react-dom';
import retargetEvents from 'react-shadow-dom-retarget-events';
import MovieSuggestion from './MovieSuggestion';
import * as styles from './assets/scss/main.scss';

export default class MovieSuggestionElement extends HTMLElement {
  static get observedAttributes() {
    return [
      'genres',
      'is-loading',
      'movies',
      'selectedGenres',
      'selectedSorting',
    ];
  }

  attributeChangedCallback(param, oldValue, newValue) {
    switch (param) {
      case 'genres':
        this[param] = JSON.parse(newValue);
        break;
      default:
        this[param] = newValue;
    }
  }

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
          genres: this.genres || [],
          loading: this.loading,
          movies: [],
          selectedGenres: [],
          selectedSorting: 'popularity',
        },
        React.createElement('slot')
      ),
      mountPoint
    );

    retargetEvents(shadowRoot);
  }

  get loading() {
    return (
      this.hasAttribute('loading') && this.getAttribute('loading') !== 'false'
    );
  }

  set loading(newValue) {
    if (newValue) {
      this.setAttribute('loading', '');
    } else {
      this.removeAttribute('loading');
    }
  }
}

window.customElements.define('movie-suggestion', MovieSuggestionElement);
