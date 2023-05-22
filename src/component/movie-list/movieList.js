import React, { Component } from "react";
import MovieService from "../../service";
import './moviList.css'

export default class MovieList extends Component {
  movie = new MovieService();

  state = {
    title: null,
    id: null,
    overview: null,
    releaseDate: null,
    genres: null,
    backdropPath: null,
  };

  constructor() {
    super();
    this.updateMovie();
  }

  updateMovie() {
    this.movie.getResourse().then((body) => {
      console.log(body);
      console.log(body.backdrop_path);
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
    const { title, id, overview, releaseDate, genres, backdropPath } =
      this.state;
    const rootPoster = "https://image.tmdb.org/t/p/original/";
    return (
      <div className="d-flex cont-div">
        <div className="cont-image">
          <img
            className="my-img, img-fluid"
            src={`${rootPoster}${backdropPath}`}
          ></img>
        </div>
        <div className="w-50 cont-ul">
          <ul>
            <li>{title}</li>
            <li>{id}</li>
            <li>{overview}</li>
            <li>{releaseDate}</li>
            <li>{genres}</li>
          </ul>
        </div>
      </div>
    );
  }
}
