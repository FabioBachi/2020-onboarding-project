define([
  "underscore",
  "jquery",
  "views/home",
  "collections/SelectedGenres",
  "../../../core/dist/bundle",
], (_, $, HomeView, SelectedGenres, Core) => {
  const selectedGenres = new SelectedGenres();
  const homeView = new (HomeView(selectedGenres))({ el: $("#main") });

  window.addEventListener("onToggleGenre", (event) => {
    selectedGenres.reset(Core.Genres.toggleGenre(event.detail.genre));
  });

  window.addEventListener("onChangeSorting", (event) => {
    Core.Sorting.setSortingOption(event.detail.sortBy);
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
