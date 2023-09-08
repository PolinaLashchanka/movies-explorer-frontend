import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useState, useEffect } from "react";

function Movies({
  visibleFilms,
  searchMovies,
  searchShortMovies,
  addMoreMovies,
  count,
  setVisibleFilms
}) {
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    setSearchWord(JSON.parse(localStorage.getItem("searchWord")) ?? '');
    setVisibleFilms(JSON.parse(localStorage.getItem("searchedMovies")) ?? []);
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchWord(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovies(searchWord);
  };

  return (
    <section className="main movies">
      <SearchForm
        searchShortMovies={searchShortMovies}
        searchWord={searchWord}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <MoviesCardList
        visibleFilms={visibleFilms}
        addMoreMovies={addMoreMovies}
        count={count}
      />
    </section>
  );
}

export default Movies;
