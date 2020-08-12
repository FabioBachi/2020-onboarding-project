define(["backbone"], function (Backbone) {
  const Genre = Backbone.Model.extend({
    defaults: { id: null, name: "" },
  });

  return Genre;
});
