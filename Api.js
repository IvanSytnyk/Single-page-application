const API_KEY = `api_key=9ab4e0c0c4d3ba62a8ae20bc1aaa38f1`;

class Api {
  constructor() {
    this.url = `https://api.themoviedb.org/3/`;
    this.headers = { "Content-Type": "application/json" };
  }

  async fetchPopularMovies() {
    try {
      const res = await fetch(
        `${this.url}movie/popular?${API_KEY}`,
        {
          headers: this.headers,
        }
      );

      const data = await res.json();
      //return await data.results;
      return data.results;
    } catch (err) {
      console.log("Error ", err);
    }
  }

  async fetchMovieDetails(id) {
    try {
      const res = await fetch(
        `${this.url}movie/${id}?${API_KEY}&language=en-US`,
        {
          headers: this.headers,
        }
      );

      const data = await res.json();
      return data;
    } catch (err) {
      console.log("Error ", err);
    }
  }

  async fetchMoviesBySearchText(search) {
    try {
      const res = await fetch(
        `${this.url}search/movie?${API_KEY}&query=${search}`,
        {
          headers: this.headers,
        }
      );
      console.log();
      const data = await res.json();
      return data;
    } catch (err) {
      console.log("Error ", err);
    }
  }
}

export default new Api();