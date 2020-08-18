define(["backbone", "models/Genre"], function (Backbone, Genre) {
  const SelectedGenres = Backbone.Collection.extend({
    model: Genre,
  });

  return SelectedGenres;
});
