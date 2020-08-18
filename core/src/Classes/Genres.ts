import axios from "axios";

import tmdb from "../Utils/tmdb";

export default class Genres {
  async fetchGenres(): Promise<Array<Genre>> {
    return new Promise<Array<Genre>>((resolve, reject) => {
      axios
        .get(`${tmdb.baseUrl}/genre/movie/list?api_key=${tmdb.key}`)
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

  getSelectedGenres(): Array<Genre> {
    const storedGenres: string | null = localStorage.getItem("genres");
    return storedGenres ? JSON.parse(storedGenres) : [];
  }

  toggleGenre(genre: Genre): Array<Genre> {
    let genres: Array<Genre> = this.getSelectedGenres();

    if (genres.find((g) => g.id == genre.id)) {
      genres = genres.filter((g) => g.id != genre.id);
    } else {
      genres.push(genre);
    }

    localStorage.setItem("genres", JSON.stringify(genres));

    return genres;
  }
}
