import "./SavedMovies.css";
import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function SavedMovies({
  visibleSavedMovies,
  searchSavedMovies,
  isLoading,
  noSavedMoviesMessage,
  deleteMovie,
}) {
  const [savedShort, setSavedShort] = useState(false);
  const [searchWordSaved, setSearchWordSaved] = useState("");
  const [classNameSaved, setClassNameSaved] = useState("");

   function searchSavedShortMovies() {
    setSavedShort(!savedShort);
  }

  const handleSavedChange = (e) => {
    const { value } = e.target;
    setSearchWordSaved(value);
  };


  const handleSavedSubmit = (e) => {
    e.preventDefault();
    if (searchWordSaved === "") {
      setClassNameSaved("visible");
    } else {
      searchSavedMovies(searchWordSaved);
    }
  };

  return (
    <section className="main saved-movies">
      <SearchForm
        searchShortMovies={searchSavedShortMovies}
        searchWord={searchWordSaved}
        setSearchWord={setSearchWordSaved}
        short={savedShort}
        className={classNameSaved}
        setClassName={setClassNameSaved}
        handleChange={handleSavedChange}
        handleSubmit={handleSavedSubmit}
      />
      {isLoading && <Preloader />}
      {noSavedMoviesMessage ? (
        <h2 className="movies__no-result-message">{noSavedMoviesMessage}</h2>
      ) : (
        <MoviesCardList
          visibleMovies={visibleSavedMovies}
          deleteMovie={deleteMovie}
          short={savedShort}
        />
      )}
    </section>
  );
}

export default SavedMovies;
