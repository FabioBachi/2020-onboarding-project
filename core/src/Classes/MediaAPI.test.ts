import axios, { AxiosInstance } from "axios";
import { expect } from "chai";
import moxios from "moxios";
import sinon from "sinon";

import MediaAPI from "./MediaAPI";
import GenresAPI from "./GenresAPI";
import { MediaType } from "../Types/MediaType";
import SortingAPI from "./SortingAPI";
import tmdb from "../Utils/tmdb";

describe("Media", () => {
  let axiosInstance: AxiosInstance;
  let genres: GenresAPI;
  let movies: MediaAPI;
  let sorting: SortingAPI;

  before(() => {
    genres = new GenresAPI();
    movies = new MediaAPI();
    sorting = new SortingAPI();

    axiosInstance = axios.create();
    moxios.install(axiosInstance);

    sinon.stub(axios, "create").returns(axiosInstance);
  });

  after(() => {
    sinon.restore();
    moxios.uninstall(axiosInstance);
  });

  it("should return a valid TMDb url", () => {
    genres.toggleGenre({ id: 27, name: "Horror" }, MediaType.Movie);

    expect(movies.getFetchUrl(MediaType.Movie)).to.contain(tmdb.baseUrl);
  });

  it("should change the current page number", () => {
    movies.setCurrentPage(2);
    expect(movies.currentPage).to.equal(2);
  });

  it("should fetch a movie list", async () => {
    moxios.stubRequest(/discover\/movie/, {
      status: 200,
      response: {
        results: [
          {
            id: 1,
            voteAverage: 45,
            posterPath:
              "https://image.tmdb.org/t/p/w220_and_h330_face/jsMVRjLwKWN3gaiGd9pJUrxezsp.jpg",
            releaseDate: "12/03/2020",
            title: "Blade Runner 2049",
            url: "https://www.themoviedb.org/movie/335984",
          },
        ],
      },
    });

    const list: Array<Media> = await movies.fetchMedia(MediaType.Movie, true);
    expect(list.length).to.be.greaterThan(0);
    expect(list[0].title).to.be.equal("Blade Runner 2049");
  });

  it("should fetch a video from a specific movie", async () => {
    moxios.stubRequest(/\/videos/, {
      status: 200,
      response: {
        results: [
          {
            id: "533ec654c3a36854480003eb",
            iso_639_1: "en",
            iso_3166_1: "US",
            key: "SUXWAEX2jlg",
            name: "Trailer 1",
            site: "YouTube",
            size: 720,
            type: "Trailer",
          },
        ],
      },
    });

    const video: Video = await movies.fetchMainVideo(1, MediaType.Movie);
    expect(video.id).to.be.equal("533ec654c3a36854480003eb");
  });
});
