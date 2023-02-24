import Api from "../Api.js";
import { asyncProvider } from "../loader.js";
import { Films } from "./popular.js";
import { layout } from "./popular.js";
import { renderPopularMovies } from "./popular.js";
import { events } from "./popular.js";
import { readLocalStorage } from "./popular.js";

const root = document.getElementById('app');

export const Bookmark = async () => { 

  const filmList = await Promise.all(readLocalStorage().map(id => Api.fetchMovieDetails(id)));
  root.innerHTML = layout;

  renderPopularMovies(filmList);
  events();
  
};