define(["underscore", "backbone", "../../../ui/public/bundle"], (
  _,
  Backbone,
  movieSuggestionElement
) => {
  return () => {
    const HomeView = Backbone.View.extend({
      genres: null,
      selectedGenres: null,

      tagName: "div",

      initialize: function (options) {
        this.genres = options.genres;
        this.selectedGenres = options.selectedGenres;

        _.bindAll(this, "render");

        this.genres.bind("reset", this.render);
        this.genres.bind("add", this.render);
        this.genres.bind("remove", this.render);

        this.selectedGenres.bind("reset", this.render);
        this.selectedGenres.bind("add", this.render);
        this.selectedGenres.bind("remove", this.render);
      },

      render: function () {
        console.log("render");

        this.$el.html(
          `<movie-suggestion
            genres='${JSON.stringify(this.genres.toJSON())}'
            loading
            selected-genres='${JSON.stringify(
              this.selectedGenres.toJSON().map((genre) => genre.id)
            )}'
            selected-sorting='${window.localStorage.getItem("sortBy")}'
          />`
        );
      },
    });

    return HomeView;
  };
});
