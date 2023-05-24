import React, { Component } from "react";
import "./searchMovie.css";

export default class SearchMovie extends Component {
  state = {
    films: "",
  };

  handleChange = (event) => {
    const films = event.target.value;
    this.setState({ films });
    this.props.search(films);
  };

  render() {
    return (
      <form>
        <input
          type="text"
          value={this.state.films}
          placeholder="Назовите фильм"
          onChange={this.handleChange}
        ></input>
      </form>
    );
  }
}
