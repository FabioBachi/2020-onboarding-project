define([
  "underscore",
  "backbone",
  "tpl!../../templates/home.tpl",

  "collections/Media",
  "utils/strings",
  "../../../core/dist/bundle",
  "../../../ui/public/bundle",
], (_, Backbone, homeTpl, Media, stringUtils, Core) => {
  return (genres, selectedGenres) => {
    const media = new Media();

    const HomeView = Backbone.View.extend({
      mediaType: Core.MediaType.Movie,

      genres,
      media,
      selectedGenres,

      tagName: "div",

      initialize: function () {
        _.bindAll(this, "paginate");
        _.bindAll(this, "render");
        _.bindAll(this, "searchMedia");
        _.bindAll(this, "triggerMovieEvent");

        // When any of the lists receive new data, the following callbacks are executed
        this.genres.bind("reset", this.searchMedia);
        this.media.bind("reset", this.triggerMovieEvent);
        this.selectedGenres.bind("reset", this.searchMedia);

        // Fetching the complete list of genres from the API through the Core library
        Core.Genres.fetchGenres(this.mediaType)
          .then((response) => {
            genres.reset(response);
            this.render();
          })
          .catch((error) => window.dispatchEvent(new CustomEvent("onError")));
      },

      /**
       * Triggers a custom event to let the React App know that a new list of media is available
       */
      triggerMovieEvent: function () {
        window.dispatchEvent(
          new CustomEvent("onLoadMedia", {
            detail: { media: this.media.toJSON() },
          })
        );
      },

      /**
       * Uses the Core library to fetch a new list of media
       */
      searchMedia: async function () {
        await Core.Media.fetchMedia(this.mediaType, true)
          .then((response) => {
            media.reset(response);
          })
          .catch((error) => window.dispatchEvent(new CustomEvent("onError")));
      },

      /**
       * Uses the Core library to fetch the next page of media
       */
      paginate: async function () {
        if (!Core.Media.foundLastPage) {
          this.page++;

          await Core.Media.fetchMedia(this.mediaType, false)
            .then((response) => {
              media.reset([...this.media.toJSON(), ...response]);
            })
            .catch((error) => window.dispatchEvent(new CustomEvent("onError")));
        }
      },

      render: function () {
        this.$el.html(
          homeTpl({
            genres: stringUtils.escapeHtml(
              JSON.stringify(this.genres.toJSON())
            ),
            selectedGenres: JSON.stringify(
              Core.Genres.getSelectedGenres(this.mediaType).map(
                (genre) => genre.id
              )
            ),
            selectedSorting: Core.Sorting.getSortingOption(this.mediaType),
          })
        );
      },
    });

    return HomeView;
  };
});
