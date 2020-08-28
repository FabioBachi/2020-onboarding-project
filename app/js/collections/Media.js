define(["backbone", "models/Media"], function (Backbone, MediaModel) {
  const Media = Backbone.Collection.extend({
    model: MediaModel,
  });

  return Media;
});
