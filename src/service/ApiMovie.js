export default class MovieService {
    _apiBase = `https://api.themoviedb.org/3/movie/${550}?api_key=98312ffcf969092a3b66b9fb44af06cc`;
  
    async getResourse() {
      const one = await fetch(`${this._apiBase}`);
      const two = await one.json();
      return two;
    }
  }

//   const movie = new MovieService();
// movie.getResourse().then((body) => {
//   const { title, id, genres, overview, release_date } = body;
//   console.log(`${title}\n${id}\n${genres}\n${overview}\n${release_date}`);
//   console.log(genres);
// });
