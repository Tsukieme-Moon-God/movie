import React from 'react';
import ReactDOM from 'react-dom/client';
import MovieList from './component/movie-list/movieList';
import './index.css';



const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(<MovieList />);