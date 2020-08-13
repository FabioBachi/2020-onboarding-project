define([
  "underscore",
  "backbone",
  "moment",
  "tpl!../../templates/home.tpl",
  "../../../ui/public/bundle",
  "collections/Genres",
  "collections/Movies",
  "utils/strings",
], (
  _,
  Backbone,
  moment,
  homeTpl,
  movieSuggestionElement,
  Genres,
  Movies,
  stringUtils
) => {
  return (selectedGenres) => {
    const genres = new Genres();
    const movies = new Movies();

    genres.fetch({ reset: true });
    selectedGenres.fetch();

    const HomeView = Backbone.View.extend({
      loading: true,

      genres,
      selectedGenres,

      tagName: "div",

      initialize: function () {
        _.bindAll(this, "render");
        _.bindAll(this, "searchMovies");

        this.genres.bind("reset", this.searchMovies);

        this.selectedGenres.bind("reset", this.searchMovies);
        this.selectedGenres.bind("add", this.searchMovies);
        this.selectedGenres.bind("remove", this.searchMovies);
      },

      searchMovies: function () {
        this.loading = true;
        this.render();

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
          `vote_count.gte=500`,
        ];
        movies.url = `${movies.baseUrl}&${params.join("&")}`;

        movies.fetch({
          complete: () => {
            this.loading = false;
            this.render();
          },
        });
      },

      render: function () {
        this.$el.html(
          homeTpl({
            genres: stringUtils.escapeHtml(
              JSON.stringify(this.genres.toJSON())
            ),
            loading: this.loading ? "loading" : "",
            movies: stringUtils.escapeHtml(JSON.stringify(movies.toJSON())),
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
