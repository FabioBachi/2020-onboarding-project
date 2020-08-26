import axios from "axios";

import Movies from "./Movies";
import Genres from "./Genres";
import Sorting from "./Sorting";

const genres = new Genres();
const movies = new Movies();
const sorting = new Sorting();

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create.mockReturnValue(mockedAxios);

it("should return a valid TMDb url", () => {
  genres.toggleGenre({ id: 27, name: "Horror" });
  sorting.setSortingOption("releaseDate");

  expect(movies.getFetchUrl()).toBeDefined();
});

it("should change the current page number", () => {
  movies.setCurrentPage(2);
  expect(movies.currentPage).toBe(2);
});

it("should fetch a movie list", async () => {
  mockedAxios.get.mockResolvedValue({
    data: {
      results: [
        {
          id: 1,
          voteAverage: 45,
          posterPath:
            "https://image.tmdb.org/t/p/w220_and_h330_face/jsMVRjLwKWN3gaiGd9pJUrxezsp.jpg",
          releaseDate: "12/03/2020",
          title: "Blade Runner 2049",
          url: "https://www.themoviedb.org/movie/335984",
        },
      ],
    },
  });

  const list = await movies.fetchMovies(true);
  expect(list.length).toBeGreaterThan(0);
  expect(list[0].title).toBe("Blade Runner 2049");
});

it("should fetch a video from a specific movie", async () => {
  mockedAxios.get.mockResolvedValue({
    data: {
      results: [
        {
          id: "533ec654c3a36854480003eb",
          iso_639_1: "en",
          iso_3166_1: "US",
          key: "SUXWAEX2jlg",
          name: "Trailer 1",
          site: "YouTube",
          size: 720,
          type: "Trailer",
        },
      ],
    },
  });

  const video: Video = await movies.fetchMainVideo(1);
  expect(video).toBeDefined();
  expect(video.id).toBe("533ec654c3a36854480003eb");
});
