import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './index.production';
import * as styles from './assets/scss/main.scss';

export default class MediaSuggestionElement extends HTMLElement {
  static get observedAttributes() {
    return ['genres', 'media', 'selected-genres', 'selected-sorting'];
  }

  attributeChangedCallback(param, oldValue, newValue) {
    switch (param) {
      case 'genres':
      case 'media':
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

    // Hack for event triggering correction
    Object.defineProperty(mountPoint, 'ownerDocument', { value: shadowRoot });
    shadowRoot.createElement = (...args) => document.createElement(...args);

    ReactDOM.render(
      React.createElement(
        App,
        {
          genres: this.genres || [],
          media: this.media || [],
          selectedGenres: this.selectedGenres || [],
          selectedSorting: this.selectedSorting || 'voteAverage',
        },
        React.createElement('slot')
      ),
      mountPoint
    );
  }
}

window.customElements.define('media-suggestion', MediaSuggestionElement);
