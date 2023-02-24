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
  let page = 1;//film.total_pages;
  
  const list = document.getElementById("list")
  const results = document.createElement("h2"); 
  results.innerHTML = `Results: ${film.total_results}, Pages: ${film.total_pages}`
  list.prepend(results);
  
  renderPopularMovies(film.results);

  if (film.total_pages > page) {
    const loadMoreButton = document.createElement("button");
    loadMoreButton.textContent = "Load More";
    list.append(loadMoreButton);

    loadMoreButton.addEventListener("click", async () => {
      page = page + 1;
      const nfilm = await asyncProvider(async () => await Api.fetchMoviesBySearchText(`${find}&page=${page}`));
      console.log(nfilm);
      renderPopularMovies(nfilm.results);
      list.append(loadMoreButton);

      if (nfilm.total_pages == page) {
        loadMoreButton.remove();
      }
     
    });
  } 

  events();
};
