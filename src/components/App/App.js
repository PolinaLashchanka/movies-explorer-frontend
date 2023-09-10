import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { CurrentUserContext } from "../../context/CurrentUserContext";
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
import * as mainApi from "../../utils/MainApi";
import { useEffect, useState } from "react";
import { useResize } from "../../hooks/useResize";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allMovies, setAllMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noMoviesMessage, setNoMoviesMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const { isScreenLg, isScreenMd, isScreenSm, addMoreMovies, setCount, count } =
    useResize();

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .checkToken(jwt)
        .then((res) => {
          setCurrentUser(res);
          // navigate("/movies");
        })
        .catch(console.error);
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

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

  function onHandleRegister(name, email, password) {
    mainApi
      .register(name, email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          const { token, ...rest } = data;
          setCurrentUser(rest);
          // handleLogin(email);
          navigate("/movies");
          setServerError("");
        }
      })
      .catch((err) => {
        setServerError(err.message);
      });
  }

  function onHandleLogin(email, password) {
    mainApi
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          const { token, ...rest } = data;
          setCurrentUser(rest);
          // handleLogin(email);
          navigate("/movies");
        }
      })
      .catch((err) => {
        setServerError(err.message);
      });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
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
          <Route
            path="/signup"
            element={
              <Register
                onHandleRegister={onHandleRegister}
                serverError={serverError}
                setServerError={setServerError}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                onHandleLogin={onHandleLogin}
                serverError={serverError}
                setServerError={setServerError}
              />
            }
          />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
