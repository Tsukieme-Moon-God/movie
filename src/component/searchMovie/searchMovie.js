import React, { Component } from "react";
import "./searchMovie.css";

export default class SearchMovie extends Component {

  render() {
    return (
      <form>
        <input
          type="text"
          value={this.props.search}
          placeholder="Назовите фильм"
          onChange={this.props.handleChange}
        ></input>
      </form>
    );
  }
}