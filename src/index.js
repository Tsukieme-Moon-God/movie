import React from "react";
import ReactDOM from "react-dom/client";
import MovieList from "./component/movie-list/movieList";
import SearchMovie from "./component/searchMovie/searchMovie";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

class App extends React.Component {
  state = {
    search: "",
  };

  handleChange = (event) => {
    const search = event.target.value;
    this.setState({ search });
  };

  // внутри searchMovie есть свой стейт
  // movieList ничего не знает о состоянии searchMovie но при этом должен на него реагировать
  render() {
    return (
      <div>
        <SearchMovie
          handleChange={this.handleChange}
          search={this.state.search}
        />
        <MovieList search={this.state.search} />
      </div>
    );
  }
}

root.render(<App />);
