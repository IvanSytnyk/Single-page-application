class Api {
    constructor() {
        this.url = 'https://api.themoviedb.org/3/movie/popular?api_key=9ab4e0c0c4d3ba62a8ae20bc1aaa38f1';
        this.headers = { "Content-Type": "application/json" };
    }

    async fetchPopularMovies() {
        try {
            const res = await fetch(this.url, {
                headers: this.headers
            });

            const data = await res.json();
            return await data.results;
        } catch (err) {
            console.log("Error ", err);
        }
    }

    async fetchMovieDetails(id) {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=9ab4e0c0c4d3ba62a8ae20bc1aaa38f1&language=en-US`, {
                headers: this.headers
            });

            const data = await res.json();
            return await data;
        } catch (err) {
            console.log("Error ", err);
        }
    }
}

export default new Api();