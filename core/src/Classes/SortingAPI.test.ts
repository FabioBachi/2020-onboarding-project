import { expect } from "chai";
import SortingAPI from "./SortingAPI";

describe("Sorting", function () {
  let sorting: SortingAPI;

  before(() => {
    sorting = new SortingAPI();
  });

  it("should return the default sorting option", function () {
    const sortBy = sorting.getSortingOption();
    expect(sortBy).to.equal(sorting.defaultSortingOption);
  });

  it("should change the sorting option", function () {
    sorting.setSortingOption("releaseDate");
    expect(sorting.getSortingOption()).to.equal("releaseDate");
  });
});
