define(["backbone", "../../../ui/public/bundle"], (Backbone, q) => {
  return (genres, movies) => {
    const HomeView = Backbone.View.extend({
      tagName: "div",

      initialize: function () {
        this.render();
      },

      render: function () {
        this.$el.html("<movie-suggestion></movie-suggestion>");
      },
    });

    return HomeView;
  };
});
