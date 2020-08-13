define(["backbone"], function (Backbone) {
  const Movie = Backbone.Model.extend({
    defaults: {
      id: null,
      voteAverage: 0,
      posterPath: null,
      releaseDate: null,
      title: null,
      url: null,
    },
  });

  return Movie;
});
