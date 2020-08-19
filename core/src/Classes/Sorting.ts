export default class Sorting {
  defaultSortingOption: string = "voteAverage";

  /**
   * Access the current sorting option.
   * @return {string} The current sorting option.
   */
  getSortingOption(): string {
    const sorting: string | null = localStorage.getItem("sortBy");
    return sorting || this.defaultSortingOption;
  }

  /**
   * Saves in local storage the new sorting option, while checking if it is a valid option.
   * @return {string} The new sorting option.
   */
  setSortingOption(sortBy: string): string {
    localStorage.setItem(
      "sortBy",
      sortBy == "voteAverage" ? "voteAverage" : "releaseDate"
    );

    return sortBy;
  }
}
