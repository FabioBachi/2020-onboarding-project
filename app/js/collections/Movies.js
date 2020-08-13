define(["backbone", "models/Genre", "utils/config", "moment"], function (
  Backbone,
  Genre,
  config,
  moment
) {
  const Genres = Backbone.Collection.extend({
    model: Genre,
    parse: function (data) {
      data =
        data !== undefined && data.results !== undefined ? data.results : [];

      return data.map((movie) => ({
        id: movie.id,
        voteAverage: movie.vote_average,
        posterPath: movie.poster_path
          ? `http://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
        releaseDate: moment(movie.release_date).format("DD/MM/YYYY"),
        title: movie.title,
        url: `https://www.themoviedb.org/movie/${movie.id}`,
      }));
    },
    baseUrl: `${config.tmdbBaseUrl}/discover/movie?api_key=${config.apiKey}`,
  });

  return Genres;
});
