import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ visibleFilms }) {
  return (
    <section className="main movies">
      <SearchForm />
      <MoviesCardList visibleFilms={visibleFilms} />
    </section>
  );
}

export default Movies;
