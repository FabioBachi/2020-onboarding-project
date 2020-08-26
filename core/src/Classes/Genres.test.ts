import axios from "axios";

import Genres from "./Genres";
const genres = new Genres();

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create.mockReturnValue(mockedAxios);

it("should fetch a movie list", async () => {
  mockedAxios.get.mockResolvedValue({
    data: {
      genres: [
        {
          id: 1,
          name: "Horror",
        },
      ],
    },
  });

  const list = await genres.fetchGenres();
  expect(list.length).toBeGreaterThan(0);
  expect(list[0].name).toBe("Horror");
});

it("should return a empty list", () => {
  const list = genres.getSelectedGenres();
  expect(list).toBeDefined();
  expect(list.length).toBe(0);
});

it("should add a genre", () => {
  const list = genres.toggleGenre({ id: 1, name: "Genre name" });
  expect(list).toBeDefined();
  expect(list.length).toBe(1);
});

it("should remove a genre", () => {
  const list = genres.toggleGenre({ id: 1, name: "Genre name" });
  expect(list).toBeDefined();
  expect(list.length).toBe(0);
});
