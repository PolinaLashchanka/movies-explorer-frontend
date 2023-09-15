import "./Movies.css";
import { AppContext } from "../../context/AppContext";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { useState, useEffect, useContext } from "react";

function Movies({
  searchedMovies,
  searchMovies,
  addMoreMovies,
  count,
  noMoviesMessage,
  saveMovie,
  savedMovies,
  deleteMovie,
}) {
  const [searchWord, setSearchWord] = useState("");
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [short, setShort] = useState(false);
  const [className, setClassName] = useState("");

  const isLoading = useContext(AppContext);

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
    if (searchWord === "") {
      setClassName("visible");
    } else {
      searchMovies(searchWord);
    }
  };

  return (
    <section className="main movies">
      <SearchForm
        searchShortMovies={searchShortMovies}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        short={short}
        className={className}
        setClassName={setClassName}
      />
      {isLoading && <Preloader />}
      {visibleMovies.length === 0 ? (
        <h2 className="movies__no-result-message">{noMoviesMessage}</h2>
      ) : (
        <MoviesCardList
          visibleMovies={visibleMovies}
          addMoreMovies={addMoreMovies}
          count={count}
          short={short}
          saveMovie={saveMovie}
          savedMovies={savedMovies}
          deleteMovie={deleteMovie}
        />
      )}
    </section>
  );
}

export default Movies;
