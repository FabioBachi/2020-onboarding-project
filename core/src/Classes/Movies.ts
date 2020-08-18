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

  getFetchUrl(): string {
    const genres = this.genres
      .getSelectedGenres()
      .map((genre: Genre) => genre.id)
      .join(",");

    const sortBy =
      this.sorting.getSortingOption() === "releaseDate"
        ? "release_date.desc"
        : "vote_average.desc";

    const params = [
      `sort_by=${sortBy}`,
      `with_genres=${genres}`,
      `primary_release_date.lte=${moment().format("YYYY-MM-DD")}`,
      "vote_count.gte=500",
      `page=${this.currentPage}`,
    ].join("&");

    return `${tmdb.baseUrl}/discover/movie?api_key=${tmdb.key}&${params}`;
  }

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
            this.foundLastPage = response.data.results.length < 20;

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

  setCurrentPage(page: number): number {
    this.currentPage = page >= 1 ? page : 1;
    return this.currentPage;
  }
}
