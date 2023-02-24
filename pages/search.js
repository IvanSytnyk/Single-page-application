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
  const pages = 1;//film.total_pages;
  
  const list = document.getElementById("list")
  const results = document.createElement("h2"); 
  results.innerHTML = `Results: ${film.total_results} ${film.total_pages}`
  list.prepend(results);
  
  renderPopularMovies(film.results);
  events();
};
