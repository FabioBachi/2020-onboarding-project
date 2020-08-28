import axios, { AxiosInstance } from "axios";
import { expect } from "chai";
import moxios from "moxios";
import sinon from "sinon";

import GenresAPI from "./GenresAPI";
import { MediaType } from "../Types/MediaType";

describe("Genres", () => {
  let axiosInstance: AxiosInstance;
  let genres: GenresAPI;

  before(() => {
    genres = new GenresAPI();

    axiosInstance = axios.create();
    moxios.install(axiosInstance);

    sinon.stub(axios, "create").returns(axiosInstance);
  });

  after(() => {
    sinon.restore();
    moxios.uninstall(axiosInstance);
  });

  it("should fetch movie genres list", async () => {
    moxios.stubRequest(/genre\/movie/, {
      status: 200,
      response: {
        genres: [
          {
            id: 1,
            name: "Horror",
          },
        ],
      },
    });

    const list = await genres.fetchGenres(MediaType.Movie);
    expect(list.length).to.be.greaterThan(0);
    expect(list[0].name).to.be.equal("Horror");
  });

  it("should return a empty list of selected genres", () => {
    const list = genres.getSelectedGenres(MediaType.Movie);
    expect(list.length).to.be.equal(0);
  });

  it("should add a movie genre", () => {
    const list = genres.toggleGenre(
      { id: 1, name: "Genre name" },
      MediaType.Movie
    );
    expect(list.length).to.be.equal(1);
  });

  it("should remove a movie genre", () => {
    const list = genres.toggleGenre(
      { id: 1, name: "Genre name" },
      MediaType.Movie
    );
    expect(list.length).to.be.equal(0);
  });
});
