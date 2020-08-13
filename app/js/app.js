define(["underscore", "jquery", "views/home", "collections/SelectedGenres"], (
  _,
  $,
  HomeView,
  SelectedGenres
) => {
  const selectedGenres = new SelectedGenres();
  const homeView = new (HomeView(selectedGenres))({ el: $("#main") });

  window.addEventListener("onToggleGenre", (event) => {
    const genre = selectedGenres.findWhere({ id: event.detail.genre.id });

    if (!genre) {
      selectedGenres.create(event.detail.genre);
    } else {
      genre.destroy();
    }
  });

  window.addEventListener("onChangeSorting", (event) => {
    const sortBy = event.detail.sortBy;
    window.localStorage.setItem("sortBy", sortBy);
    console.log(sortBy);

    homeView.searchMovies();
  });

  return this;
});
