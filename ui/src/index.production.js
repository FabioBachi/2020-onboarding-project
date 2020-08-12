import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MovieSuggestion from './MovieSuggestion';
import * as styles from './assets/scss/main.scss';

export default class MovieSuggestionElement extends HTMLElement {
  static get observedAttributes() {
    return [
      'genres',
      'loading',
      'movies',
      'selected-genres',
      'selected-sorting',
    ];
  }

  attributeChangedCallback(param, oldValue, newValue) {
    console.log('param change: ', param);
    switch (param) {
      case 'genres':
        this[param] = JSON.parse(newValue);
        break;
      case 'selected-genres':
        this.selectedGenres = JSON.parse(newValue);
        break;
      case 'selected-sorting':
        this.selectedSorting = newValue;
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

    console.log('new react params: ', {
      genres: this.genres || [],
      loading: this.loading,
      movies: this.movies || [],
      selectedGenres: this.selectedGenres || [],
      selectedSorting: this.selectedSorting || 'popularity',
    });

    Object.defineProperty(mountPoint, 'ownerDocument', { value: shadowRoot });
    shadowRoot.createElement = (...args) => document.createElement(...args);

    ReactDOM.render(
      React.createElement(
        MovieSuggestion,
        {
          genres: this.genres || [],
          loading: this.loading,
          movies: this.movies || [],
          selectedGenres: this.selectedGenres || [],
          selectedSorting: this.selectedSorting || 'popularity',
        },
        React.createElement('slot')
      ),
      mountPoint
    );
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
