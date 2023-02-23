import Api from "../Api.js";
import { asyncProvider } from "../loader.js";
import { Films } from "./popular.js";

const root = document.getElementById('app');

export const Search = async () => {
  const [, find] = window.location.search.split("?query=");
  const movie = document.querySelector("ul");

  const film = await asyncProvider(async () => await Api.fetchMoviesBySearchText(find));
  console.log(film);
  
  
  
  movie.innerHTML = `
        <h1>Search ${find}</h1>
    `;

  
};
