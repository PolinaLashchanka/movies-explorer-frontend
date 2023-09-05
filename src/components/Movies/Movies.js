import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies({ visibleFilms }) {
  return (
    <main className="main movies">
      <SearchForm />
      <MoviesCardList visibleFilms={visibleFilms} />
    </main>
  );
}

export default Movies;
