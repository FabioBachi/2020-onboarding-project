define([
  "underscore",
  "jquery",
  "collections/Genres",
  "views/home",
  "collections/SelectedGenres",
], (_, $, Genres, HomeView, SelectedGenres) => {
  const genres = new Genres();
  const selectedGenres = new SelectedGenres();

  genres.fetch();
  selectedGenres.fetch();

  const homeView = new (HomeView())({ el: $("#main"), genres, selectedGenres });

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

    homeView.render();
  });

  return this;
});
