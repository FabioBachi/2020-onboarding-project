import moment from "moment";

import Core from "./Core";
import { MediaType } from "../Types/MediaType";
import tmdb from "../Utils/tmdb";

import GenresAPI from "./GenresAPI";
import SortingAPI from "./SortingAPI";

export default class MediaAPI extends Core {
  genres: GenresAPI = new GenresAPI();
  sorting: SortingAPI = new SortingAPI();

  currentPage: number = 1;
  foundLastPage: boolean = false;

  /**
   * Used to build a valid TMDb Movie Discovery URL, based on the sorting options that the user selected.
   * @param {MediaType} type To fetch either TV or movie genres.
   * @return {string} A URL to use in the API request.
   */
  getFetchUrl(type: MediaType): string {
    // Gets the selected sorting option.
    const sortBy: string = this.sorting.transformSortingOption(
      this.sorting.getSortingOption(),
      type
    );

    const endpoint: string =
      sortBy === "trending" ? `/trending/${type}/day` : `/discover/${type}`;

    return `${tmdb.baseUrl}${endpoint}`;
  }

  /**
   * Returns an object representing the API params
   * @param {MediaType} type To fetch either TV or movie genres.
   * @return Record<string, string | number> API params.
   */
  getFetchParams(type: MediaType): Record<string, string | number> {
    // Loads all selected genres from local storage.
    const genres: string = this.genres
      .getSelectedGenres(type)
      .map((genre: Genre) => genre.id)
      .join(",");

    // Gets the selected sorting option.
    const sortBy: string = this.sorting.transformSortingOption(
      this.sorting.getSortingOption(),
      type
    );

    // Creating all parameters that will be in the URL.
    // Using array syntax for better readability.
    // The Trending Movies endpoint does not accept any kind of params or filters but pagination.
    let params: Record<string, string | number> = {
      api_key: tmdb.key,
      page: this.currentPage,
    };
    if (sortBy !== "trending") {
      params = {
        ...params,

        sort_by: `${sortBy}`,
        with_genres: `${genres}`,
        "vote_count.gte": "500",
      };

      if (type === MediaType.Movie) {
        params = {
          ...params,

          "primary_release_date.lte": `${moment().format("YYYY-MM-DD")}`,
        };
      }
    }

    return params;
  }

  /**
   * Fetches movie search results from the TMDb's API.
   * @param {MediaType} type To fetch either TV or movie genres.
   * @param {boolean} resetPagination If it is a new search, resetPagination can be used to reset the currentPage to 1.
   * @return {Promise<Array<Media>>} A promise with a list of media as its result.
   */
  async fetchMedia(
    type: MediaType,
    resetPagination: boolean
  ): Promise<Array<Media>> {
    if (resetPagination) {
      this.setCurrentPage(1);
    } else {
      this.setCurrentPage(this.currentPage + 1);
    }

    return new Promise<Array<Media>>(async (resolve, reject) => {
      (await this.getApi())
        .get(this.getFetchUrl(type), { params: this.getFetchParams(type) })
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
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : null,
              releaseDate: moment(movie.release_date).format("DD/MM/YYYY"),
              title: movie.title,
              url: `https://www.themoviedb.org/${type}/${movie.id}`,
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
   * @param {number} mediaId
   * @param {MediaType} type To fetch either TV or movie genres.
   * @return {Promise<Movie>} A promise with a Video object.
   */
  async fetchMainVideo(mediaId: number, type: MediaType): Promise<Video> {
    return new Promise<Video>(async (resolve, reject) => {
      (await this.getApi())
        .get(`${tmdb.baseUrl}/${type}/${mediaId}/videos?api_key=${tmdb.key}`)
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
