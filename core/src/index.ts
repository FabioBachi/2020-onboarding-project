import GenresAPI from "./Classes/GenresAPI";
import MediaAPI from "./Classes/MediaAPI";
import { MediaType as Types } from "./Types/MediaType";
import SortingAPI from "./Classes/SortingAPI";

const Genres = new GenresAPI();
const Media = new MediaAPI();
const MediaType = { TV: Types.TV, Movie: Types.Movie };
const Sorting = new SortingAPI();

export { Genres, Media, MediaType, Sorting };
