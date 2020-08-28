define(["backbone"], function (Backbone) {
  const Media = Backbone.Model.extend({
    defaults: {
      id: null,
      posterPath: null,
      releaseDate: null,
      title: null,
      url: null,
      voteAverage: 0,
    },
  });

  return Media;
});
