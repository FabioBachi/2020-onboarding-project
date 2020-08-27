import { expect } from "chai";
import Sorting from "./Sorting";

describe("Sorting", function () {
  let sorting: Sorting;

  before(() => {
    sorting = new Sorting();
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
