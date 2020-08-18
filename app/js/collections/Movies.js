define(["backbone", "models/Genre"], function (Backbone, Genre) {
  const Genres = Backbone.Collection.extend({
    model: Genre,
  });

  return Genres;
});
