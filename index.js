import { Films } from "./pages/popular.js";
import { NotFound } from "./pages/NotFound.js";
import { Movie } from "./pages/movie.js";

const root = document.getElementById("app");

//Films();
//NotFound();

const routes = [
  {
    match: (url) => {
      return url === "/";
    },
    renderRoute: Films,
  },
  {
    match: (url) => {
      return url.includes("/movies/");
    },
    renderRoute: Movie,
  },
  {
    match: () => true,
    renderRoute: NotFound,
  },
];

class Router {
  constructor(routes) {
    this._routes = routes;

    window.history.pushState = (data, title, ulr) => {
      History.prototype.pushState.apply(window.history, [data, title, ulr]);
      this.reroute();
    };

    window.onpopstate = () => {
      this.reroute();
    };
  }

  reroute() {
    const matchedRoute = this._routes.find((route) => {
      const matched = route.match(window.location.pathname);

      return matched;
    });

    matchedRoute.renderRoute();
  }
}

const router = new Router(routes);
