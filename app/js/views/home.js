define([
  "underscore",
  "backbone",
  "tpl!../../templates/home.tpl",
  "collections/Genres",
  "collections/Movies",
  "utils/strings",
  "../../../core/dist/bundle",
  "../../../ui/public/bundle",
], (_, Backbone, homeTpl, Genres, Movies, stringUtils, Core) => {
  return (selectedGenres) => {
    const genres = new Genres();
    const movies = new Movies();

    const HomeView = Backbone.View.extend({
      genres,
      movies,
      selectedGenres,

      tagName: "div",

      initialize: function () {
        _.bindAll(this, "paginate");
        _.bindAll(this, "render");
        _.bindAll(this, "searchMovies");
        _.bindAll(this, "triggerMovieEvent");

        // When any of the lists receive new data, the following callbacks are executed
        this.genres.bind("reset", this.searchMovies);
        this.movies.bind("reset", this.triggerMovieEvent);
        this.selectedGenres.bind("reset", this.searchMovies);

        // Fetching the complete list of genres from the API through the Core library
        Core.Genres.fetchGenres()
          .then((response) => {
            genres.reset(response);
            this.render();
          })
          .catch((error) => window.dispatchEvent(new CustomEvent("onError")));
      },

      /**
       * Triggers a custom event to let the React App know that a new list of movies is available
       */
      triggerMovieEvent: function () {
        window.dispatchEvent(
          new CustomEvent("onLoadMovies", {
            detail: { movies: this.movies.toJSON() },
          })
        );
      },

      /**
       * Uses the Core library to fetch a new list of movies
       */
      searchMovies: async function () {
        await Core.Movies.fetchMovies(true)
          .then((response) => {
            movies.reset(response);
          })
          .catch((error) => window.dispatchEvent(new CustomEvent("onError")));
      },

      /**
       * Uses the Core library to fetch the next page of movies
       */
      paginate: async function () {
        if (!Core.Movies.foundLastPage) {
          this.page++;

          await Core.Movies.fetchMovies(false)
            .then((response) => {
              movies.reset([...this.movies.toJSON(), ...response]);
            })
            .catch((error) => window.dispatchEvent(new CustomEvent("onError")));
        }
      },

      render: function () {
        this.$el.html(
          homeTpl({
            genres: stringUtils.escapeHtml(
              JSON.stringify(this.genres.toJSON())
            ),
            selectedGenres: JSON.stringify(
              Core.Genres.getSelectedGenres().map((genre) => genre.id)
            ),
            selectedSorting: Core.Sorting.getSortingOption(),
          })
        );
      },
    });

    return HomeView;
  };
});
