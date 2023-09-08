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
// import mainApi from "../../utils/MainApi";
import { useEffect, useState } from "react";
import { useResize } from "../../hooks/useResize";

function App() {
  const [allMovies, setAllMovies] = useState([]);
  const [visibleFilms, setVisibleFilms] = useState([]);
  const [short, setShort] = useState(false);

  const { setCountForScreenWidth, addMoreMovies, count } = useResize();

  async function initialSearch() {
    const movies = JSON.parse(localStorage.getItem("movies"));
    if (!movies) {
      const moviesFromApi = await moviesApi.getFilms();
      localStorage.setItem("movies", JSON.stringify(moviesFromApi));
      setAllMovies(moviesFromApi);
      return moviesFromApi;
    }
    setAllMovies(movies);
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
    localStorage.setItem("searchWord", JSON.stringify(word));
    return searchedMovies;
  }

  async function searchMovies(word) {
    try {
      if (!word) {
        throw new Error("введите слово");
      }
      const films = await initialSearch();
      const searchedMovies = await selectedSearch(films, word);
      setCountForScreenWidth();
      setVisibleFilms(searchedMovies);
    } catch (err) {
      console.log(err);
    }
  }

  function searchShortMovies() {
    setShort(!short);
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
              visibleFilms={visibleFilms}
              searchMovies={searchMovies}
              searchShortMovies={searchShortMovies}
              addMoreMovies={addMoreMovies}
              count={count}
              setVisibleFilms={setVisibleFilms}
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
