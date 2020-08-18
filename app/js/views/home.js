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

    Core.Genres.fetchGenres()
      .then((response) => {
        genres.reset(response);
      })
      .catch((error) => console.log(error));

    window.dispatchEvent(
      new CustomEvent("onLoadGenres", {
        detail: { genres: Core.Genres.getSelectedGenres() },
      })
    );

    const HomeView = Backbone.View.extend({
      page: 1,

      loading: true,
      foundLastPage: false,
      movieList: [],

      genres,
      movies,
      selectedGenres,

      tagName: "div",

      initialize: function () {
        _.bindAll(this, "paginate");
        _.bindAll(this, "render");
        _.bindAll(this, "searchMovies");
        _.bindAll(this, "triggerMovieEvent");

        this.genres.bind("reset", this.searchMovies);
        this.movies.bind("reset", this.triggerMovieEvent);
        this.selectedGenres.bind("reset", this.searchMovies);
      },

      triggerMovieEvent: function () {
        window.dispatchEvent(
          new CustomEvent("onLoadMovies", {
            detail: { movies: this.movies.toJSON() },
          })
        );
      },

      searchMovies: async function () {
        this.loading = true;
        this.render();

        await Core.Movies.fetchMovies(true)
          .then((response) => {
            this.loading = false;

            this.movieList = response;
            movies.reset(this.movieList);
          })
          .catch((error) => {
            console.log(error);
          });
      },

      paginate: async function () {
        if (!Core.Movies.foundLastPage) {
          this.page++;
          movies.url = Core.Movies.getFetchUrl();

          await Core.Movies.fetchMovies(false)
            .then((response) => {
              this.loading = false;

              this.movieList = [...this.movieList, ...response];
              movies.reset(this.movieList);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      },

      render: function () {
        this.$el.html(
          homeTpl({
            genres: stringUtils.escapeHtml(
              JSON.stringify(this.genres.toJSON())
            ),
            loading: this.loading ? "loading" : "",
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
