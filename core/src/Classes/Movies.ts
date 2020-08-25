import axios from "axios";
import moment from "moment";

import tmdb from "../Utils/tmdb";

import Genres from "./Genres";
import Sorting from "./Sorting";

export default class Movies {
  genres: Genres = new Genres();
  sorting: Sorting = new Sorting();

  currentPage: number = 1;
  foundLastPage: boolean = false;

  /**
   * Used to build a valid TMDb Movie Discovery URL, based on the genres and sorting options that the user selected.
   * @return {string} A URL to use in the API request.
   */
  getFetchUrl(): string {
    // Loads all selected genres from local storage.
    const genres: string = this.genres
      .getSelectedGenres()
      .map((genre: Genre) => genre.id)
      .join(",");

    // Gets the selected sorting option.
    const sortBy: string = this.sorting.transformSortingOption(
      this.sorting.getSortingOption()
    );

    const endpoint: string =
      sortBy === "trending" ? "/trending/movie/day" : "/discover/movie";

    // Creating all parameters that will be in the URL.
    // Using array syntax for better readability.
    // The Trending Movies endpoint does not accept any kind of params or filters but pagination.
    const params: Array<string> =
      sortBy !== "trending"
        ? [
            `sort_by=${sortBy}`,
            `with_genres=${genres}`,
            `primary_release_date.lte=${moment().format("YYYY-MM-DD")}`,
            "vote_count.gte=500",
          ]
        : [];
    params.push(`page=${this.currentPage}`);

    return `${tmdb.baseUrl}${endpoint}?api_key=${tmdb.key}&${params.join("&")}`;
  }

  /**
   * Fetches movie search results from the TMDb's API.
   * @param {boolean} resetPagination If it is a new search, resetPagination can be used to reset the currentPage to 1.
   * @return {Promise<Array<Movie>>} A promise with a list of movies as its result.
   */
  async fetchMovies(resetPagination: boolean): Promise<Array<Movie>> {
    if (resetPagination) {
      this.setCurrentPage(1);
    } else {
      this.setCurrentPage(this.currentPage + 1);
    }

    return new Promise<Array<Movie>>((resolve, reject) => {
      axios
        .get(this.getFetchUrl())
        .then((response) => {
          if (
            response.data !== undefined &&
            response.data.results !== undefined
          ) {
            // Controls if a next page is available or if it is the last one with tue current filters.
            this.foundLastPage = response.data.results.length < 20;

            // Transforms all results in valid Movie type objects.
            const movies = response.data.results.map((movie: any) => ({
              id: movie.id,
              posterPath: movie.poster_path
                ? `http://image.tmdb.org/t/p/w500${movie.poster_path}`
                : null,
              releaseDate: moment(movie.release_date).format("DD/MM/YYYY"),
              title: movie.title,
              url: `https://www.themoviedb.org/movie/${movie.id}`,
              voteAverage: movie.vote_average,
            }));

            resolve(movies);
          } else {
            reject("It was not possible to fetch data from the API.");
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Changes the currentPage number.
   * @param {number} page
   * @return {number} Redundantly returns the new currentPage number.
   */
  setCurrentPage(page: number): number {
    this.currentPage = page >= 1 ? page : 1;
    return this.currentPage;
  }

  /**
   * Fetches a list of videos from the API, but returns only one, giving priority to trailers. If no trailer is found, it returns the first video from the list.
   * @param {number} movieId
   * @return {Promise<Movie>} A promise with a Video object.
   */
  async fetchMainVideo(movieId: number): Promise<Video> {
    return new Promise<Video>((resolve, reject) => {
      axios
        .get(`${tmdb.baseUrl}/movie/${movieId}/videos?api_key=${tmdb.key}`)
        .then((response) => {
          if (
            response.data !== undefined &&
            response.data.results !== undefined
          ) {
            if (response.data.results.length === 0) {
              resolve();
            }

            // Search for trailers
            let video: any = response.data.results.find(
              (v: any) => v.type == "Trailer"
            );

            // If no trailer is found, get the first video
            video = video || response.data.results[0];

            resolve({
              id: video.id,
              key: video.key,
              site: video.site,
              type: video.type,
            });
          } else {
            reject("It was not possible to fetch data from the API.");
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
