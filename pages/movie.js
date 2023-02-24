import Api from "../Api.js";
import { asyncProvider } from "../loader.js";
import { readLocalStorage } from "./popular.js";
import { renderPopularMovies } from "./popular.js";
import { layout } from "./popular.js";
import { events } from "./popular.js";

const root = document.getElementById('app');

export const Movie = async () => {
  root.innerHTML = layout;

  const { pathname } = window.location;
  const [, id] = pathname.split("movies/");
  const film = await asyncProvider(async () => await Api.fetchMovieDetails(id));
  const recommendations = await asyncProvider(
    async () => await Api.fetchRecommendations(id)
  );
  const arrid = readLocalStorage();
  const list = document.getElementById("list");
  const movie = document.createElement("li");
  const lem = document.createElement("div");

  movie.dataset.movie_id = id;
  lem.innerHTML = `<h1>Recommendations:</h1>`;
  movie.innerHTML = `
                  <h1>Movie ${id}</h1>
                  <img src="https://www.themoviedb.org/t/p/w200/${
                    film.poster_path
                  }" alt="${film.original_title}">
                  <h2>${film.original_title}</h2>
                  <h3>Popularity - ${film.popularity}</h3>
                  <p><strong>Overview</strong> - ${film.overview}</p>
                  <h3>Genres : ${film.genres.map((film) => {
                    return " " + film.name;
                  })}
                  </h3>
                  <a href="#" class="like-button ${
                    arrid.includes("" + id) ? "like-button-active" : ""
                  } ">
                      <i class="fas fa-heart"></i>
                  </a>
        `;
  list.prepend(lem);
  list.prepend(movie);

  renderPopularMovies(recommendations);
  events();
};