import axios, { AxiosInstance } from "axios";
import { expect } from "chai";
import moxios from "moxios";
import sinon from "sinon";

import Genres from "./Genres";

describe("Genres", () => {
  let axiosInstance: AxiosInstance;
  let genres: Genres;

  before(() => {
    genres = new Genres();

    axiosInstance = axios.create();
    moxios.install(axiosInstance);

    sinon.stub(axios, "create").returns(axiosInstance);
  });

  after(() => {
    sinon.restore();
    moxios.uninstall(axiosInstance);
  });

  it("should fetch the genres list", async () => {
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

    const list = await genres.fetchGenres();
    expect(list.length).to.be.greaterThan(0);
    expect(list[0].name).to.be.equal("Horror");
  });

  it("should return a empty list of selected genres", () => {
    const list = genres.getSelectedGenres();
    expect(list.length).to.be.equal(0);
  });

  it("should add a genre", () => {
    const list = genres.toggleGenre({ id: 1, name: "Genre name" });
    expect(list.length).to.be.equal(1);
  });

  it("should remove a genre", () => {
    const list = genres.toggleGenre({ id: 1, name: "Genre name" });
    expect(list.length).to.be.equal(0);
  });
});
