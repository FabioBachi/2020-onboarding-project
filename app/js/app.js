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

    homeView.searchMovies();
  });

  const onScroll = async () => {
    if (
      window.pageYOffset + window.innerHeight >
      document.getElementById("main").offsetHeight - 500
    ) {
      window.removeEventListener("scroll", onScroll);
      await homeView.paginate();
      window.addEventListener("scroll", onScroll);
    }
  };

  window.addEventListener("scroll", onScroll);

  return this;
});
