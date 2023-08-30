import { useEffect, useState } from "react";
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
import api from "../../utils/Api";
import PageNotFound from "../PageNotFound/PageNotFound";

function App() {

  const [films, setFilms] = useState([]);
  const [savedFilms, setSavedFilms] = useState([]);

  useEffect(() => {
    Promise.all([api.getFilms(), api.getSavedFilms()])
    .then(([films, savedFilms]) => {
      setFilms(films);
      setSavedFilms(savedFilms);
    })
  }, []);

  return (
    <div className="page">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies films={films}/>} />
        <Route path="/saved-movies" element={<SavedMovies films={savedFilms}/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/*" element={<PageNotFound/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
