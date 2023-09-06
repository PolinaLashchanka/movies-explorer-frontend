import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import PageNotFound from "../PageNotFound/PageNotFound";
import { savedFilms } from "../../utils/constants";
import moviesApi from "../../utils/MoviesApi";
import { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [short, setShort] = useState(false);
  const [count, setCount] = useState(3);

  async function initialSearch() {
    const movies = JSON.parse(localStorage.getItem("movies"));
    if (!movies) {
      const moviesFromApi = await moviesApi.getFilms();
      localStorage.setItem("movies", JSON.stringify(moviesFromApi));
      return moviesFromApi;
    }
    return movies;
  }

  async function selectedSearch(movies, searchWord) {
    const word = searchWord.toLowerCase();
    const searchedMovies = movies.filter((movie) => {
      return (
        (movie.nameRU.toLowerCase().includes(word) ||
          movie.nameEN.toLowerCase().includes(word)) &&
        (short ? movie.duration < 41 : true)
      );
    });
    localStorage.setItem("searchedMovies", JSON.stringify(searchedMovies));
    return searchedMovies;
  }

  async function searchMovies(word) {
    try {
      if (!word) {
        throw new Error("введите слово");
      }
      const films = await initialSearch();
      const searchedMovies = await selectedSearch(films, word);
      setMovies(searchedMovies);
      setCount(3);
    } catch (err) {
      console.log(err);
    }
  }

  function searchShortMovies() {
    setShort(!short);
  }

  function addMoreMovies() {
    setCount(count + 3);
  }

  return (
    <div className="page">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/movies"
          element={
            <Movies
              visibleFilms={movies}
              searchMovies={searchMovies}
              searchShortMovies={searchShortMovies}
              addMoreMovies={addMoreMovies}
              count={count}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={<SavedMovies visibleFilms={savedFilms} />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
