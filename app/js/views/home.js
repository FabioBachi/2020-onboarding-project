define([
  "underscore",
  "backbone",
  "moment",
  "tpl!../../templates/home.tpl",
  "collections/Genres",
  "collections/Movies",
  "utils/strings",
  "../../../ui/public/bundle",
], (_, Backbone, moment, homeTpl, Genres, Movies, stringUtils) => {
  return (selectedGenres) => {
    const genres = new Genres();
    const movies = new Movies();

    genres.fetch({ reset: true });
    selectedGenres.fetch({
      success: (response) => {
        window.dispatchEvent(
          new CustomEvent("onLoadGenres", {
            detail: { genres: response.toJSON() },
          })
        );
      },
    });

    const HomeView = Backbone.View.extend({
      page: 1,

      loading: true,
      foundLastPage: false,
      movies: [],

      genres,
      selectedGenres,

      tagName: "div",

      initialize: function () {
        _.bindAll(this, "getFetchUrl");
        _.bindAll(this, "paginate");
        _.bindAll(this, "render");
        _.bindAll(this, "searchMovies");

        this.genres.bind("reset", this.searchMovies);

        this.selectedGenres.bind("reset", this.searchMovies);
        this.selectedGenres.bind("add", this.searchMovies);
        this.selectedGenres.bind("remove", this.searchMovies);
      },

      getFetchUrl: function () {
        const genres = this.selectedGenres
          .toJSON()
          .map((genre) => genre.id)
          .join(",");

        let sortBy = window.localStorage.getItem("sortBy") || "voteAverage";
        sortBy =
          sortBy === "releaseDate" ? "release_date.desc" : "vote_average.desc";

        const params = [
          `sort_by=${sortBy}`,
          `with_genres=${genres}`,
          `primary_release_date.lte=${moment().format("YYYY-MM-DD")}`,
          "vote_count.gte=500",
          `page=${this.page}`,
        ];

        return `${movies.baseUrl}&${params.join("&")}`;
      },

      triggerMovieEvent: function () {
        window.dispatchEvent(
          new CustomEvent("onLoadMovies", {
            detail: { movies: this.movies },
          })
        );
      },

      searchMovies: async function () {
        this.loading = true;
        this.render();

        this.page = 1;
        this.foundLastPage = false;

        movies.url = this.getFetchUrl();

        await new Promise((resolve) => {
          movies.fetch({
            success: (response) => {
              this.movies = response.toJSON();
            },
            complete: () => {
              this.loading = false;
              this.triggerMovieEvent();
              resolve();
            },
          });
        });
      },

      paginate: async function () {
        if (!this.foundLastPage) {
          this.page++;
          movies.url = this.getFetchUrl();

          await new Promise((resolve) => {
            movies.fetch({
              success: (response) => {
                this.foundLastPage = response.length < 20;
                this.movies = [...this.movies, ...response.toJSON()];
              },
              complete: () => {
                this.triggerMovieEvent();
                resolve();
              },
            });
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
            selectedGenres: stringUtils.escapeHtml(
              JSON.stringify(
                this.selectedGenres.toJSON().map((genre) => genre.id)
              )
            ),
            selectedSorting: window.localStorage.getItem("sortBy"),
          })
        );
      },
    });

    return HomeView;
  };
});
