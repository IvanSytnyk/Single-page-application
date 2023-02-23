import Api from "../Api.js";
import { asyncProvider } from "../loader.js";

const root = document.getElementById('app');

export const Movie = async () => {
  const { pathname } = window.location;
  const [, id] = pathname.split("movies/");

  const film = await asyncProvider(async () => await Api.fetchMovieDetails(id));
  
  const movie = document.getElementById("list");
  movie.innerHTML = `
              <ul>
                <li>
                  <h1>Movie ${id}</h1>
                  <img src="https://www.themoviedb.org/t/p/w200/${
                    film.poster_path
                  }" alt="${film.original_title}">
                  <h2>${film.original_title}</h2>
                  <h3>Popularity - ${film.popularity}</h3>
                  <p><strong>Overview</strong> - ${film.overview}</p>
                  <h3>Genres : ${film.genres.map((film) => {
                    return " "+film.name;
                  })}
                  </h3>
                </li>
              </ul>
        `;
};