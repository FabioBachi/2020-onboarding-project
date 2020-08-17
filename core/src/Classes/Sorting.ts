export default class Sorting {
  defaultSortingOption: string = "voteAverage";

  getSortingOption(): string {
    const sorting: string | null = localStorage.getItem("sortBy");
    return sorting || this.defaultSortingOption;
  }

  setSortingOption(sortBy: string): string {
    localStorage.setItem(
      "sortBy",
      sortBy == "voteAverage" ? "voteAverage" : "releaseDate"
    );

    return sortBy;
  }
}
