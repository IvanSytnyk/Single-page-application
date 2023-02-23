import Api from "../Api.js";
import { asyncProvider } from "../loader.js";

const root = document.getElementById('app');

export const Movie = async () => {
  const { pathname } = window.location;
  const [, id] = pathname.split("movies/");

  const film = await asyncProvider(async () => await Api.fetchMovieDetails(id));
  root.innerHTML = `
            <li>
                <h1>Movie ${id}</h1>
                <img src="https://www.themoviedb.org/t/p/w200/${
                  film.poster_path
                }" alt="${film.original_title}">
                <h2>${film.original_title}</h2>
                <h3>Popularity - ${film.popularity}</h3>
                <p>Overview - ${film.overview}</p>
                <h3>Genres - ${film.genres.map((film) => {
                  return film.name;
                })}
                </h3>
            </li>
        `;
};

// export const Movie = async () => {
//     const { pathname } = window.location;
//     const [,id] = pathname.split('movies/');
     
//     let body = document.querySelector('body');
 
//     let loadingElement = document.createElement('loading');
 
//     loadingElement.innerHTML = 'Loading movies';
 
//     body.append(loadingElement);

//     try {
//         const film = await Api.fetchMovieDetails(id);

//         root.innerHTML = `
//             <li>
//                 <h1>Movie ${id}</h1>
//                 <img src="https://www.themoviedb.org/t/p/w200/${film.poster_path}" alt="${film.original_title}">
//                 <p>${film.original_title}</p>
//                 <p>Popularity - ${film.popularity}</p>
//                 <p>Overview - ${film.overview}</p>
//                 <p>Genres - ${film.genres.map((film) => { 
//                 return film.name})}
//                 </p>
//             </li>
//         `;
//     }
//     catch (err) {
//         console.log("Failed with code:", err)
//     }
//     finally {
//         loadingElement.remove();
//     }
// }