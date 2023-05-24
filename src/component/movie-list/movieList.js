import React, { Component } from "react";
import MovieService from "../../service";
import "./moviList.css";

export default class MovieList extends Component {
  movie = new MovieService();

  state = {
    title: null,
    id: null,
    overview: null,
    releaseDate: null,
    genres: null,
    backdropPath: null,
    seaMovie: null,
    movie: [],
    filterMovies: [],
  };

  constructor() {
    super();
    this.updateMovie();
    this.searchMovie();
  }

  searchMovie() {
    this.movie.searchMovie("The Poseidon Adventure").then((body) => {
      this.setState({
        movie: body.results,
        filterMovies: body.results,
      });
    });
  }

  handlleSearch = (query) => {
    const filtered = this.state.movie.filter((movies) => {
      return movies.title.toLowerCase().includes(query.toLowerCase());
    });
    this.setState({ filterMovies: filtered });
    return;
  };

  updateMovie() {
    this.movie.getResourse(551).then((body) => {
      this.setState({
        title: body.title,
        id: body.id,
        overview: body.overview,
        releaseDate: body.release_date,
        backdropPath: body.backdrop_path,
        genres: body.genres.map((array) => {
          return `${array.name}     `;
        }),
      });
    });
  }

  render() {
    const {
      title,
      id,
      overview,
      releaseDate,
      genres,
      backdropPath,
      filterMovies,
      movie,
    } = this.state;

    const rootPoster = "https://image.tmdb.org/t/p/original/";

    const valueSearck = movie.map((el) => {
      return (
        <div className="card mb-3 cont-div">
         
          <div className="row g-0 h-100">
            <div className="col-md-6">
              <img
                src={`${rootPoster}${backdropPath}`}
                className="img-fluid rounded-start h-100"
                alt="..."
              ></img>
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title">{el.title}</h5>
                <p className="card-text">{el.overview}</p>
                <p className="card-text">
                  <small className="text-muted">{el.releaseDate}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return <div className="megaDiv">{valueSearck}</div>;
  }
}

// <div className="d-flex cont-div">
//   <SearchMovie search={this.handlleSearch}></SearchMovie>
//   <div className="cont-image">
//     <img
//       className="my-img, img-fluid"
//       src={`${rootPoster}${backdropPath}`}
//     ></img>
//   </div>
//   <div className="w-50 cont-ul">
//     <ul>
//       <li>{title}</li>
//       <li>{id}</li>
//       <li>{overview}</li>
//       <li>{releaseDate}</li>
//       <li>{genres}</li>
//       {filterMovies.map((el) => {
//         return <li key={el.id}>{el.title}</li>;
//       })}
//     </ul>
//   </div>
// </div>

// return (

//   <div className="card mb-3 cont-div">
//   <div className="row g-0">
//     <div className="col-md-4">
//       <img src= {`${rootPoster}${backdropPath}`} className="img-fluid rounded-start" alt="..."></img>
//     </div>
//     <div className="col-md-8">
//       <div className="card-body">
//         <h5 className="card-title">{title}</h5>
//         <p className="card-text">{overview}</p>
//         <p className="card-text"><small className="text-muted">{releaseDate}</small></p>
//       </div>
//     </div>
//   </div>
// </div>

// );
