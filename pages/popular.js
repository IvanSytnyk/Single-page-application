import Api from "../Api.js";
import { asyncProvider } from "../loader.js";

//const filmList = await asyncProvider(async () => await Api.fetchPopularMovies()); //const filmList = await asyncProvider(Api.fetchPopularMovies.bind(Api));
const root = document.getElementById("app");
const isLiked = false;
export const layout = `
  <div>
      <header>
          <div class = "head">
            <i class="fa-solid fa-film fa-2xl"></i>
            <h1 id="heading">TheMovieDB PoC</h1>
          </div>
          ${!isLiked ? '<button id="books">Bookmarks</button>' : ""}
          <div class="search">
            <svg id="svg" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
              <input class="input" type="text" placeholder="Search">
            </input>
          </div>
      </header>
      <div class="list" id="list">
        <ul>
        </ul>
      </div>
  </div>
`;

export const events = () => {
  const listof = document.querySelector("ul");
  const icon = document.querySelector("i");
  const books = document.getElementById("books");
  const input = document.querySelector("input");
  
  listof.addEventListener("click", (evt) => {

    //evt.preventDefault();

    const film = evt.target.closest("li");
    const likeButtons = evt.target.closest("a.like-button");
    
    if (likeButtons !== null) {
      likeButtons.classList.toggle("like-button-active");
      setLocalStorage(evt.target.closest("li").dataset.movie_id);
      // if (isLiked) {
      //     listof.innerHTML = ``;
      //     renderPopularMovies(filmList, true);

      // }
      return; 
    }

    if (film !== null) {
      window.history.pushState(null, null, `/movies/${film.dataset.movie_id}`);
      return;
    }
  });

  icon.addEventListener("click", (evt) => {
      window.history.pushState(null, null, `/`);
      return;
  })

  if (books) {
    books.addEventListener("click", (evt) => {
      window.history.pushState(null, null, `/bookmarks`);
      return;
    })
  } 

  input.addEventListener('keypress', (evt) => {
    if (evt.key === 'Enter') {
      const searchQuery = evt.target.value;
      window.history.pushState(null, null, `/search?query=${searchQuery}`);
    }
  })
}

export const readLocalStorage = () => {
  let arr = localStorage.getItem("id");
  arr = JSON.parse(arr);
  if (arr === null) {
    arr = [];
  }
  return arr;
};

export const setLocalStorage = (id) => {
  let arr = readLocalStorage();
  const index = arr.indexOf(id);
  if (index === -1) {
    arr.push(id);
  } else {
    arr.splice(index, 1);
  }
  return localStorage.setItem("id", JSON.stringify(arr));
};

export const renderPopularMovies = (filmList, isLiked) => {
  const listof = document.querySelector("ul");
  filmList.map((film) => {
    const popularFilm = document.createElement("li");

    const arrid = readLocalStorage();
    const { id, poster_path, original_title } = film;
    popularFilm.dataset.movie_id = id;

    popularFilm.innerHTML = `
                      <h3>${original_title}</h3>
                      <img src="https://www.themoviedb.org/t/p/w200/${poster_path}" alt="${original_title}">
                      <a href="#" class="like-button ${
                        arrid.includes("" + id) ? "like-button-active" : ""
                      } ">
                          <i class="fas fa-heart"></i>
                      </a>
              `;

    if (isLiked) {
      if (arrid.includes("" + id)) {
        listof.append(popularFilm);
      }
    } else listof.append(popularFilm);
  });
};

export const Films = async (isLiked) => {
  root.innerHTML = layout;
  const filmList = await asyncProvider(
    async () => await Api.fetchPopularMovies()
  );

  renderPopularMovies(filmList, isLiked);
  events();
};