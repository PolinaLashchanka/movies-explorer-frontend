import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ visibleFilms, searchMovies, searchShortMovies, addMoreMovies, count }) {
  return (
    <section className="main movies">
      <SearchForm searchMovies={searchMovies} searchShortMovies={searchShortMovies}/>
      <MoviesCardList visibleFilms={visibleFilms} addMoreMovies={addMoreMovies} count={count}/>
    </section>
  );
}

export default Movies;
