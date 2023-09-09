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
import { useState } from "react";
import { useResize } from "../../hooks/useResize";

function App() {
  const [allMovies, setAllMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noMoviesMessage, setNoMoviesMessage] = useState("");

  const { isScreenLg, isScreenMd, isScreenSm, addMoreMovies, setCount, count } =
    useResize();

  async function initialSearch() {
    try {
      const moviesFromApi = await moviesApi.getFilms();
      setAllMovies(moviesFromApi);
      return moviesFromApi;
    } catch (err) {
      setNoMoviesMessage(
        "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
      );
    }
  }

  async function selectedSearch(result, searchWord) {
    const word = searchWord.toLowerCase();
    const searchedMovies = result.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(word) ||
        movie.nameEN.toLowerCase().includes(word)
      );
    });
    localStorage.setItem("searchedMovies", JSON.stringify(searchedMovies));
    localStorage.setItem("searchWord", JSON.stringify(word));
    return searchedMovies;
  }

  function noMoviesFound() {
    setNoMoviesMessage("Ничего не найдено.");
    setSearchedMovies([]);
  }

  function moviesFound(movies) {
    setNoMoviesMessage("");
    setSearchedMovies(movies);
  }

  async function searchMovies(word) {
    try {
      setIsLoading(true);
      const needToLoad = allMovies.length === 0;
      const result = needToLoad ? await initialSearch() : allMovies;
      const searchedMovies = await selectedSearch(result, word);
      searchedMovies.length === 0
        ? noMoviesFound()
        : moviesFound(searchedMovies);
      isScreenLg && setCount(12);
      isScreenMd && setCount(8);
      isScreenSm && setCount(5);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
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
              searchedMovies={searchedMovies}
              searchMovies={searchMovies}
              addMoreMovies={addMoreMovies}
              count={count}
              isLoading={isLoading}
              noMoviesMessage={noMoviesMessage}
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
