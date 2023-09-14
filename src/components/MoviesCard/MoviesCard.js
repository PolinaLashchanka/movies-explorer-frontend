import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard({ film, saveMovie, savedMovies, deleteMovie }) {
  const location = useLocation();
  const path = location.pathname;
  const minutes = film.duration;

  const time =
    minutes >= 60
      ? `${(minutes / 60) | 0} ч ${minutes % 60} мин`
      : `${minutes} мин`;

  const isSaved = savedMovies && savedMovies.some((i) => i.movieId === film.id);

  function changeSavedButtonState(film) {
    if (isSaved) {
      deleteMovie(film.id);
    } else {
      saveMovie(film);
    }
  }
  return (
    <div className="card">
      <div className="card__header">
        <h2 className="card__name">{film.nameRU}</h2>
        <p className="card__duration">{time}</p>
      </div>
      <a
        className="link"
        href={film.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <div
          className="card__image"
          style={
            path === "/movies"
              ? {
                  backgroundImage: `url(https://api.nomoreparties.co${film.image.url})`,
                }
              : { backgroundImage: `url(${film.image})` }
          }
        ></div>
      </a>
      {path === "/movies" && (
        <button
          onClick={() => changeSavedButtonState(film)}
          className={`button card__save-button ${
            isSaved && "card__save-button_saved"
          }`}
        >
          {!isSaved && "Сохранить"}
        </button>
      )}
      {path === "/saved-movies" && (
        <button onClick={() => deleteMovie(film.movieId)} className="button card__save-button">&#10006;</button>
      )}
    </div>
  );
}

export default MoviesCard;
