define(["backbone"], function (Backbone) {
  const Movie = Backbone.Model.extend({
    defaults: {
      id: null,
      posterPath: null,
      releaseDate: null,
      title: null,
      url: null,
      voteAverage: 0,
    },
  });

  return Movie;
});
