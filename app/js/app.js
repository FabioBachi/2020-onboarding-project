define([
  "underscore",
  "jquery",
  "views/home",
  "collections/SelectedGenres",
  "../../../core/dist/bundle",
], (_, $, HomeView, SelectedGenres, Core) => {
  const selectedGenres = new SelectedGenres();
  const homeView = new (HomeView(selectedGenres))({ el: $("#main") });

  // onChangeSorting is triggered when a user changes the sorting option in the React Application
  window.addEventListener("onChangeSorting", (event) => {
    // Sets the new sorting option in local storage with Core library
    Core.Sorting.setSortingOption(event.detail.sortBy);

    // Fetch a new list of movies with the new sorting option
    homeView.searchMovies();
  });

  // When a genre button has been clicked, onToggleGenre is triggered
  window.addEventListener("onToggleGenre", (event) => {
    // Uses the Core library to set a new list of genres, after toggling the selected one
    selectedGenres.reset(Core.Genres.toggleGenre(event.detail.genre));
  });

  // When a user clicks the "Watch trailer" button.
  window.addEventListener("onVideoDemand", async (event) => {
    if (event.detail.movieId) {
      Core.Movies.fetchMainVideo(event.detail.movieId)
        .then((video) => {
          // Triggers a new event with the video as its payload.
          window.dispatchEvent(
            new CustomEvent("onLoadVideo", {
              detail: { movieId: event.detail.movieId, video },
            })
          );
        })
        .catch((error) => {
          window.dispatchEvent(new CustomEvent("onError"));

          window.dispatchEvent(
            new CustomEvent("onLoadVideo", {
              detail: { movieId: event.detail.movieId, video: undefined },
            })
          );
        });
    }
  });

  // Infinite scroll pagination
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
