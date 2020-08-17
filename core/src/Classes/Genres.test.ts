import Genres from "./Genres";

const genres = new Genres();

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
