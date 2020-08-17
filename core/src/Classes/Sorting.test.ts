import Sorting from "./Sorting";

const sorting = new Sorting();

it("should return the default sorting option", () => {
  const sortBy = sorting.getSortingOption();
  expect(sortBy).toBe(sorting.defaultSortingOption);
});

it("should change the sorting option", () => {
  const sortBy = sorting.setSortingOption("releaseDate");
  expect(sortBy).toBe("releaseDate");
});
