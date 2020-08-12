define(["backbone", "localStorage", "models/Genre", "utils/config"], function (
  Backbone,
  LocalStorage,
  Genre,
  config
) {
  const SelectedGenres = Backbone.Collection.extend({
    model: Genre,
    localStorage: new Backbone.LocalStorage("selectedGenres"),
  });

  return SelectedGenres;
});
