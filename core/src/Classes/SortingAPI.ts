import { MediaType } from "../Types/MediaType";

export default class Sorting {
  defaultSortingOption: string = "releaseDate";
  availableOptions: Record<string, string> = {
    releaseDate: "release_date.desc",
    trending: "trending",
    voteAverage: "vote_average.desc",
  };

  /**
   * Access the current sorting option.
   * @return {string} The current sorting option.
   */
  getSortingOption(): string {
    const sorting: string | null = localStorage.getItem("sortBy");
    return sorting || this.defaultSortingOption;
  }

  /**
   * Transforms an "application sorting option" to the API sorting option.
   * @param {string} option The new sorting option.
   * @param {MediaType} type To return according sorting option.
   * @return {string} A sorting option that can be used by the API.
   */
  transformSortingOption(option: string, type: MediaType): string {
    let transformedOption =
      this.availableOptions[option] || this.defaultSortingOption;

    if (type === MediaType.TV && option === "releaseDate") {
      transformedOption = "first_air_date.desc";
    }

    return transformedOption;
  }

  /**
   * Saves in local storage the new sorting option, while checking if it is a valid option.
   * @return {string} The new sorting option.
   */
  setSortingOption(sortBy: string): string {
    localStorage.setItem(
      "sortBy",
      Object.keys(this.availableOptions).indexOf(sortBy) >= 0
        ? sortBy
        : this.defaultSortingOption
    );

    return sortBy;
  }
}
