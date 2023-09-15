import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import { AppContext } from "../../context/AppContext";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import PageNotFound from "../PageNotFound/PageNotFound";
import moviesApi from "../../utils/MoviesApi";
import * as mainApi from "../../utils/MainApi";
import { useEffect, useState } from "react";
import { useResize } from "../../hooks/useResize";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const [currentUser, setCurrentUser] = useState({});
  const [allMovies, setAllMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [visibleSavedMovies, setVisibleSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noMoviesMessage, setNoMoviesMessage] = useState("");
  const [noSavedMoviesMessage, setNoSavedMoviesMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editMessage, setEditMessage] = useState("");

  const { isScreenLg, isScreenMd, isScreenSm, addMoreMovies, setCount, count } =
    useResize();

  function handleLogin(user) {
    setCurrentUser(user);
    setLoggedIn(true);
  }

  function handlePath() {
    if (path === "/movies") {
      navigate("/movies");
    } else if (path === "/profile") {
      navigate("/profile");
    } else if (path === "/saved-movies") {
      navigate("/saved-movies");
    } else if (path === "/" || path === "/signup" || path === "/signin") {
      navigate("/");
    }
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi
        .checkToken(jwt)
        .then((res) => {
          handleLogin(res);
          handlePath();
        })
        .catch(console.error);
    }
  }

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
    if (path === "/movies") {
      localStorage.setItem("searchedMovies", JSON.stringify(searchedMovies));
      localStorage.setItem("searchWord", JSON.stringify(word));
    }
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

  function noSavedMoviesFound() {
    setNoSavedMoviesMessage("Ничего не найдено.");
    setVisibleSavedMovies([]);
  }

  function savedMoviesFound(movies) {
    setNoSavedMoviesMessage("");
    setVisibleSavedMovies(movies);
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

  async function searchSavedMovies(word) {
    try {
      setIsLoading(true);
      const searchedSavedMovies = await selectedSearch(savedMovies, word);
      searchedSavedMovies.length === 0
        ? noSavedMoviesFound()
        : savedMoviesFound(searchedSavedMovies);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  function onHandleRegister(name, email, password) {
    setIsLoading(true);
    mainApi
      .register(name, email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          const { token, ...rest } = data;
          handleLogin(rest);
          navigate("/movies");
        }
      })
      .catch((err) => {
        setServerError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function onHandleLogin(email, password) {
    setIsLoading(true);
    mainApi
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          const { token, ...rest } = data;
          handleLogin(rest);
          navigate("/movies");
        }
      })
      .catch((err) => {
        setServerError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function onHandleProfileChange(email, password) {
    setIsLoading(true);
    setEdit(false);
    mainApi
      .editProfile(email, password)
      .then((user) => {
        setCurrentUser(user);
        setEditMessage("Данные пользователя успешно изменены!");
      })
      .catch(() => setEditMessage("При обновлении профиля произошла ошибка."))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function editProfile() {
    setEdit(true);
    setEditMessage("");
  }

  function onSignOut() {
    localStorage.clear();
    setCurrentUser({});
    setLoggedIn(false);
    setSearchedMovies([]);
    navigate("/");
  }

  function saveMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then((res) => {
        setSavedMovies([res, ...savedMovies]);
      })
      .catch((err) => console.log(err));
  }

  function deleteMovie(id) {
    mainApi
      .deleteMovie(id)
      .then((res) => {
        setSavedMovies((state) =>
          state.filter((movie) => movie.movieId !== res.movieId)
        );
        setVisibleSavedMovies((state) =>
          state.filter((movie) => movie.movieId !== res.movieId)
        );
      })
      .catch((res) => console.log(res));
  }

  function getAllSavedMovies() {
    setNoSavedMoviesMessage("");
    mainApi
      .getSavedMovies()
      .then((res) => {
        setVisibleSavedMovies(res.reverse());
        setSavedMovies(res);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    getAllSavedMovies();
  }, [loggedIn]);

  return (
    <div className={`page ${path !== "/" && "page__max-width"}`}>
      <AppContext.Provider value={isLoading}>
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            loggedIn={loggedIn}
            setEdit={setEdit}
            setEditMessage={setEditMessage}
            getAllSavedMovies={getAllSavedMovies}
          />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  element={Movies}
                  loggedIn={loggedIn}
                  searchedMovies={searchedMovies}
                  searchMovies={searchMovies}
                  addMoreMovies={addMoreMovies}
                  count={count}
                  noMoviesMessage={noMoviesMessage}
                  saveMovie={saveMovie}
                  savedMovies={savedMovies}
                  deleteMovie={deleteMovie}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  loggedIn={loggedIn}
                  visibleSavedMovies={visibleSavedMovies}
                  setSavedMovies={setSavedMovies}
                  searchSavedMovies={searchSavedMovies}
                  noSavedMoviesMessage={noSavedMoviesMessage}
                  deleteMovie={deleteMovie}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  element={Profile}
                  loggedIn={loggedIn}
                  onSignOut={onSignOut}
                  path={"/profile"}
                  onHandleProfileChange={onHandleProfileChange}
                  editProfile={editProfile}
                  edit={edit}
                  editMessage={editMessage}
                />
              }
            />
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
      </AppContext.Provider>
    </div>
  );
}

export default App;
