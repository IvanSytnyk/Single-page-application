import Api from "../Api.js";
import { asyncProvider } from "../loader.js";

//const filmList = await asyncProvider(async () => await Api.fetchPopularMovies()); //const filmList = await asyncProvider(Api.fetchPopularMovies.bind(Api));
const root = document.getElementById('app');

const readLocalStorage = () => {
  let arr = localStorage.getItem("id");
  arr = JSON.parse(arr);
  if (arr === null) {
    arr = [];
  }
  return arr;
}; 

const setLocalStorage = (id) => {
  let arr = readLocalStorage();
  const index = arr.indexOf(id);
  if (index === -1) {
    arr.push(id);
  } else {
    arr.splice(index, 1);
  }
  return localStorage.setItem("id", JSON.stringify(arr));
};

export const Films = () => {
  root.innerHTML = `
        <div>
            <header>
                <h1>TheMovieDB PoC</h1>
            </header>
            <ul class="list" id="list"></ul>
        </div>
    `;
    const renderPopularMovies = async () => {
      const listof = document.querySelector("ul");
      const filmList = await asyncProvider(async () => await Api.fetchPopularMovies());

      filmList.map((film) => {
        const popularFilm = document.createElement("li");

        const arrid = readLocalStorage();
        const { id, poster_path, original_title } = film;
        popularFilm.dataset.movie_id = id;

        popularFilm.innerHTML = `
                        <h3>${original_title}</h3>
                        <img src="https://www.themoviedb.org/t/p/w200/${poster_path}" alt="${original_title}">
                        <a href="#" class="like-button ${ arrid.includes(""+id) ? "like-button-active" : ""} ">
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
          setLocalStorage(evt.target.closest("li").dataset.movie_id);
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

  renderPopularMovies();
};
