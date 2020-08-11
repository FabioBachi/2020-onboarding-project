define(["underscore", "jquery", "collections/Genres", "views/home"], (
  _,
  $,
  Genres,
  HomeView,
  q
) => {
  const genres = new Genres();

  genres.fetch({
    success: (collection, response, options) => {
      console.log(collection.toJSON());
    },
    error: (a, b, c) => {
      console.log((a, b, c));
    },
  });

  const homeView = new (HomeView(genres, []))({ el: $("#main") });

  return this;
});
