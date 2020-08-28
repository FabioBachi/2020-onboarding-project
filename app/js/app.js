define([
  "underscore",
  "jquery",
  "views/home",
  "collections/Genres",
  "collections/SelectedGenres",
  "../../../core/dist/bundle",
], (_, $, HomeView, Genres, SelectedGenres, Core) => {
  const genres = new Genres();
  const selectedGenres = new SelectedGenres();
  const homeView = new (HomeView(genres, selectedGenres))({ el: $("#main") });

  // When the media type has been changed by the user
  window.addEventListener("onMediaTypeChange", (event) => {
    homeView.mediaType = event.detail.type;
    Core.Genres.fetchGenres(homeView.mediaType)
      .then((response) => {
        genres.reset(response);
        homeView.render();
        homeView.searchMedia();
      })
      .catch((error) => window.dispatchEvent(new CustomEvent("onError")));
    homeView.searchMedia();
  });

  // onChangeSorting is triggered when a user changes the sorting option in the React Application
  window.addEventListener("onChangeSorting", (event) => {
    // Sets the new sorting option in local storage with Core library
    Core.Sorting.setSortingOption(event.detail.sortBy);

    // Fetch a new list of media with the new sorting option
    homeView.searchMedia();
  });

  // When a genre button has been clicked, onToggleGenre is triggered
  window.addEventListener("onToggleGenre", (event) => {
    // Uses the Core library to set a new list of genres, after toggling the selected one
    selectedGenres.reset(
      Core.Genres.toggleGenre(event.detail.genre, event.detail.type)
    );
  });

  // When a user clicks the "Watch trailer" button.
  window.addEventListener("onVideoDemand", async (event) => {
    if (event.detail.mediaId) {
      Core.Media.fetchMainVideo(event.detail.mediaId, event.detail.type)
        .then((video) => {
          // Triggers a new event with the video as its payload.
          window.dispatchEvent(
            new CustomEvent("onLoadVideo", {
              detail: { mediaId: event.detail.mediaId, video },
            })
          );
        })
        .catch((error) => {
          window.dispatchEvent(new CustomEvent("onError"));

          window.dispatchEvent(
            new CustomEvent("onLoadVideo", {
              detail: { mediaId: event.detail.mediaId, video: undefined },
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
