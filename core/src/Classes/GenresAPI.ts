import Core from "./Core";
import tmdb from "../Utils/tmdb";
import { MediaType } from "../Types/MediaType";

export default class GenresAPI extends Core {
  /**
   * Fetches a genre list from the API.
   * @param {MediaType} type To fetch either TV or movie genres.
   * @return {Array<Genre>} A list of all TMDb's genres.
   */
  async fetchGenres(type: MediaType): Promise<Array<Genre>> {
    return new Promise<Array<Genre>>(async (resolve, reject) => {
      (await this.getApi())
        .get(`${tmdb.baseUrl}/genre/${type}/list`, {
          params: { api_key: tmdb.key },
        })
        .then((response) => {
          if (
            response.data !== undefined &&
            response.data.genres !== undefined
          ) {
            resolve(
              response.data.genres && response.data.genres.length
                ? response.data.genres
                : []
            );
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
   * Returns a list of favorite genres previously stored when the user manually selected them.
   * @param {MediaType} type To fetch either TV or movie genres.
   * @return {Array<Genre>} The list of selected genres.
   */
  getSelectedGenres(type: MediaType): Array<Genre> {
    const storedGenres: string | null = localStorage.getItem(`${type}-genres`);
    return storedGenres ? JSON.parse(storedGenres) : [];
  }

  /**
   *
   * @param {Genre} genre The genre that must be added/removed from the local storage.
   * @return {Array<Genre>} The list of selected genres.
   */
  toggleGenre(genre: Genre, type: MediaType): Array<Genre> {
    let genres: Array<Genre> = this.getSelectedGenres(type);

    // Toggling: if it is in the local storage, remove it. Otherwise, add it.
    if (genres.find((g) => g.id == genre.id)) {
      genres = genres.filter((g) => g.id != genre.id);
    } else {
      genres.push(genre);
    }

    localStorage.setItem(`${type}-genres`, JSON.stringify(genres));

    return genres;
  }
}
