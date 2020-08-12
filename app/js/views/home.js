define(["underscore", "backbone", "../../../ui/public/bundle"], (
  _,
  Backbone,
  q
) => {
  return () => {
    window.addEventListener("onToggleGenre", (event) =>
      console.log(event.detail.genre)
    );

    const HomeView = Backbone.View.extend({
      genres: null,

      tagName: "div",

      initialize: function (options) {
        this.genres = options.genres;

        // Ensure our methods keep the `this` reference to the view itself
        _.bindAll(this, "render");

        // Bind collection changes to re-rendering
        this.genres.bind("reset", this.render);
        this.genres.bind("add", this.render);
        this.genres.bind("remove", this.render);
      },

      render: function () {
        this.$el.html(
          `<movie-suggestion genres='${JSON.stringify(
            this.genres.toJSON()
          )}' loading></movie-suggestion>`
        );
      },
    });

    return HomeView;
  };
});
