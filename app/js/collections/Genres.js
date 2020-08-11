define(["backbone", "models/Genre", "utils/config"], function (
  Backbone,
  Genre,
  config
) {
  const Genres = Backbone.Collection.extend({
    model: Genre,
    parse: function (data) {
      return data !== undefined && data.genres !== undefined ? data.genres : [];
    },
    url: `${config.tmdbBaseUrl}/genre/movie/list?api_key=${config.apiKey}`,
  });

  return Genres;
});
