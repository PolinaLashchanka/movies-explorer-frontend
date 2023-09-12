import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
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
  const [isLoading, setIsLoading] = useState(false);
  const [noMoviesMessage, setNoMoviesMessage] = useState("");
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
          handleLogin(rest);
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
          handleLogin(rest);
          navigate("/movies");
        }
      })
      .catch((err) => {
        setServerError(err.message);
      });
  }

  function onHandleProfileChange(email, password) {
    mainApi
      .editProfile(email, password)
      .then((user) => {
        setCurrentUser(user);
        setEdit(false);
        setEditMessage('Данные пользователя успешно изменены!')
      })
      .catch(() => setEditMessage('При обновлении профиля произошла ошибка.'));
  }

  function editProfile() {
    setEdit(true);
    setEditMessage("");
  }

  function onSignOut() {
    localStorage.clear();
    setCurrentUser({});
    setLoggedIn(false);
    navigate("/");
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} setEdit={setEdit} setEditMessage={setEditMessage}/>
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
                isLoading={isLoading}
                noMoviesMessage={noMoviesMessage}
              />
            }
          />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute element={SavedMovies} loggedIn={loggedIn} />
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
    </div>
  );
}

export default App;
