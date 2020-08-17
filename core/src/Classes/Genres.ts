export default class Genres {
  getSelectedGenres(): Array<Genre> {
    const storedGenres: string | null = localStorage.getItem("genres");
    return storedGenres ? JSON.parse(storedGenres) : [];
  }

  toggleGenre(genre: Genre): Array<Genre> {
    let genres: Array<Genre> = this.getSelectedGenres();

    if (genres.find((g) => g.id == genre.id)) {
      genres = genres.filter((g) => g.id != genre.id);
    } else {
      genres.push(genre);
    }

    localStorage.setItem("genres", JSON.stringify(genres));

    return genres;
  }
}
