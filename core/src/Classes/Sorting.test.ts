import Sorting from "./Sorting";

const sorting = new Sorting();

it("should return the default sorting option", () => {
  const sortBy = sorting.getSortingOption();
  expect(sortBy).toBe(sorting.defaultSortingOption);
});

it("should change the sorting option", () => {
  sorting.setSortingOption("releaseDate");
  expect(sorting.getSortingOption()).toBe("releaseDate");
});
