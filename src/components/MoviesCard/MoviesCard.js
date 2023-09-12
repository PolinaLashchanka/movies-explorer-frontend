import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard(props) {
  const location = useLocation();
  const path = location.pathname;
  const [isSaved, setIsSaved] = useState(false);
  const minutes = props.duration;

  const time =
    minutes >= 60
      ? `${(minutes / 60) | 0} ч ${minutes % 60} мин`
      : `${minutes} мин`;

  function save() {
    setIsSaved(!isSaved);
  }

  console.log(props);

  return (
    <div className="card">
        <div className="card__header">
          <h2 className="card__name">{props.nameRU}</h2>
          <p className="card__duration">{time}</p>
        </div>
        <a
        className="link"
        href={props.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <div
          className="card__image"
          style={{
            backgroundImage: `url(https://api.nomoreparties.co${props.image.url})`,
          }}
        ></div>
        </a>
        {path === "/movies" && (
          <button
            onClick={save}
            className={`button card__save-button ${
              isSaved ? "card__save-button_saved" : ""
            }`}
          >
            {isSaved ? "" : "Сохранить"}
          </button>
        )}
        {path === "/saved-movies" && (
          <button className="button card__save-button">&#10006;</button>
        )}
    </div>
  );
}

export default MoviesCard;
