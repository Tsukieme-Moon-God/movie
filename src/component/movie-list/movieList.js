import React, { Component } from "react";
import MovieService from "../../service";
import "./moviList.css";
import { Spin, Pagination } from "antd";

export default class MovieList extends Component {
  MovieService = new MovieService(); // создаем экземпляр класса, для получения его свойств/методов
  state = {
    // создаем объект состояний
    movies: [], // свойство в виде пустого массива, которое будет хранить список фильмов
    loading: true, // свойство отвечающее за индикатор загрузки, по умолчанию TRUE, то есть загрузка идет
    currentPage: 1, // свойство отвечающее за текущую страницу в пагинации
    itemPages: 6, // свойство отрбражающее количесвто страниц
  };

  handleClick(pageNum) {
    // функция для перехода между страницами пагинации
    this.setState({
      currentPage: pageNum,
    });
  }

  componentDidUpdate(prevProps) {
    // запускаем при обновлении компонента, а именно изменении в пропсах/состояниях
    // prevProps - аргумент, который хранит в себе предыдущее значение пропса
    if (prevProps.search !== this.props.search) {
      // условие = если предыдущее значение пропса НЕ РАВНО текущему, то есть оно изменилось
      this.setState({
        loading: true, // тогда состояние индикатора загрузки становится true. Проще говоря на экране появляется спинер как визуализация загрузки
      });
      this.searchMovie(); // затем вызываем метод для поиска фильмов.
      // То есть сначало идет запрос к серверву, на это время появляется индикатор загрузки. Когда же ответ приходит, активируется метод поиска фильмов. 20 строка является логическим продолжением 17.
    }
  }

  componentDidMount() {
    // срабатывает при первой загрузке страницы
    this.MovieService.searchMovie("Стражи").then((body) => {
      // запрос к объекту MovieService и вызов у него метода searchmove, который принимает строку СТРАЖИ, и отправляет ее к серверу.
      // метод then получает ответ сервера в виде ПРОМИСА, помещая его в аргумент BODY
      this.setState({
        // изменяет состояние
        movies: body.results, // состояние movies принимает ответ сервера в виде списка фильмов
        loading: false, // индикатор загрузки принимает значание FALSE, впоследствии завершая свою работу.
      });
    });
  }
  searchMovie() {
    // вызываем метод
    if (this.props.search !== "") {
      //  условие, если прос не является пустой строкой, вызываем код ниже
      this.MovieService.searchMovie(this.props.search).then((body) => {
        // вызываем объеки МувиСервис, у него берем метод ПоисФильма, и в качестве аргумента используем пропс, отправляя запрос на сервер
        // ответ сервера обрабатывается методом ЗЕН, который хранит его в аргументе БАДИ,
       
        this.setState({
          // обновляем состояние
          movies: body.results, // мувис, принимает в качестве значения список фильмов
          loading: false, // индикаор загрузки, завершает свою работу
        });
      });
    }
  }

  render() {
    const { movies, loading, currentPage, itemPages } = this.state; // деструктуризация одноименных свойств из состояния, можно обращаться к ним в блоке рэндера напрямую.

    if (loading) {
      // условная отрисовка, если ЛОАДИНГ будет иметь значение ИСТИНА
      return <Spin />; // тогда будет возвращен компонент СПИНЕР, отвечающий за визуализацию загрузки
    }

    const lastIndexItem = currentPage * itemPages; // получение индекса последнего фильма-элемента на странице
    const firstIndexItem = lastIndexItem - itemPages; // получение индекса первого фильма-элемента на странице
    const currentItems = movies.slice(firstIndexItem, lastIndexItem); // количество фильмов-элементов на странице
    const allPages = Math.ceil(movies.length / itemPages); // общее количество страниц в пагинации

    const rootPoster = "https://image.tmdb.org/t/p/w500"; // константа храняющая в себе путь к постеру
    const valueSearck = currentItems.map((el) => {
      // создание карточки для фильма
      return (
        <div className="card mb-3 cont-div" key={el.id}>
          <div className="row g-0 h-100">
            <div className="col-md-6">
              <img
                src={`${rootPoster}${el.backdrop_path}`}
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
    return (
      <>
        <div className="megaDiv">{valueSearck}</div>
        {/* <Pagination
          defaultCurrent={currentPage}
          total={allPages}
          onChange={this.handleClick}
        /> */}
        {Array.from(
          { length: allPages },
          (
            _,
            index // создаем новый массив, который будет хранит в себе кнопки страниц пагинации
          ) => (
            <button
              className="m-2"
              key={index}
              onClick={() => this.handleClick(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </>
    );
  }
}
