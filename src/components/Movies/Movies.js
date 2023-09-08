import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useState, useEffect } from "react";

function Movies({
  searchedMovies,
  searchMovies,
  addMoreMovies,
  count,
}) {
  const [searchWord, setSearchWord] = useState("");
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [short, setShort] = useState(false);

  useEffect(() => {
    setSearchWord(JSON.parse(localStorage.getItem("searchWord")) ?? "");
    setShort(JSON.parse(localStorage.getItem("isShort")) ?? false);
    searchedMovies.length !== 0
      ? setVisibleMovies(searchedMovies)
      : setVisibleMovies(
          JSON.parse(localStorage.getItem("searchedMovies")) ?? []
        );
  }, [searchedMovies]);

  function searchShortMovies() {
    setShort(!short);
    localStorage.setItem("isShort", JSON.stringify(!short));
  }

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
        short={short}
      />
      <MoviesCardList
        visibleMovies={visibleMovies}
        addMoreMovies={addMoreMovies}
        count={count}
        short={short}
      />
    </section>
  );
}

export default Movies;
