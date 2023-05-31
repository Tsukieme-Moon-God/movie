export default class MovieService {
  _apiBase = `https://api.themoviedb.org/3/movie/343611?api_key=98312ffcf969092a3b66b9fb44af06cc`;
  _apiBase_02 = `https://api.themoviedb.org/3/search/movie?api_key=98312ffcf969092a3b66b9fb44af06cc&query=`;

  async getResourse(movie) {
    const one = await fetch(
      `https://api.themoviedb.org/3/movie/${movie}?api_key=98312ffcf969092a3b66b9fb44af06cc`
    );
    const two = await one.json();
    return two;
  }

  async searchMovie(search) {
    const one = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=98312ffcf969092a3b66b9fb44af06cc&query=${search}`
    );

    const two = await one.json();
    return two;
  }
}

// const value = new MovieService();
// value.searchMovie().then((el) => {
//   console.log(el);
// });
