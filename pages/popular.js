import Api from "../Api.js";
import { asyncProvider } from "../loader.js";

const filmList = await asyncProvider(async () => await Api.fetchPopularMovies()); //const filmList = await asyncProvider(Api.fetchPopularMovies.bind(Api));

const root = document.getElementById('app');

export const Films = () => {
  root.innerHTML = `
        <div>
            <header>
                <h1>TheMovieDB PoC</h1>
            </header>
            <ul class="list" id="list"></ul>
        </div>
    `;
    const renderPopularMovies = (filmList) => {
      const listof = document.querySelector("ul");

      filmList.map((film) => {
        const popularFilm = document.createElement("li");

        popularFilm.dataset.movie_id = film.id;
        popularFilm.innerHTML = `
                        <h3>${film.original_title}</h3>
                        <img src="https://www.themoviedb.org/t/p/w200/${film.poster_path}" alt="${film.original_title}">
                        <a href="#" class="like-button">
                            <i class="fas fa-heart"></i>
                        </a>
                `;

        listof.append(popularFilm);
      })

      listof.addEventListener("click", (evt) => {
        evt.preventDefault();

        const film = evt.target.closest("li");
        const likeButtons = evt.target.closest("a.like-button");
        if (likeButtons !== null) {
          likeButtons.classList.toggle("like-button-active");

          return;
        }

        if (film !== null) {
          window.history.pushState(
            null,
            null,
            `/movies/${film.dataset.movie_id}`
          );
          return;
        }
      })
    }

  renderPopularMovies(filmList);
};
