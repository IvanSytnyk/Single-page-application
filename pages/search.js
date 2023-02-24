import Api from "../Api.js";
import { asyncProvider } from "../loader.js";
import { layout } from "./popular.js";
import { renderPopularMovies } from "./popular.js";
import { events } from "./popular.js";

const root = document.getElementById('app');

export const Search = async () => {
  const [, find] = window.location.search.split("?query=");
  root.innerHTML = layout;

  const film = await asyncProvider(async () => await Api.fetchMoviesBySearchText(find));
  const pages = film.total_pages;
  console.log(pages);

  renderPopularMovies(film.results);
  events();
};
