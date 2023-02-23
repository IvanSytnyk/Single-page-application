import Api from "../Api.js";
import { asyncProvider } from "../loader.js";
import { Films } from "./popular.js";
import { layout } from "./popular.js";
import { renderPopularMovies } from "./popular.js";
import { events } from "./popular.js";

const root = document.getElementById('app');
const isLiked = true;

export const Bookmark = async () => { 
  const filmList = await asyncProvider(
    async () => await Api.fetchPopularMovies()
  );
  root.innerHTML = layout;
  renderPopularMovies(filmList, isLiked);
  events();
  //Films(true);
};
