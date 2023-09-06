import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

function MoviesCardList({ visibleFilms, addMoreMovies, count }) {
  const location = useLocation();
  const path = location.pathname;
  
  return (
    <section className="movies-list">
      <div className="movies-list__container">
        {visibleFilms.slice(0, count).map((film) => (
          <MoviesCard key={film.id} {...film} />
        ))}
      </div>
      {path === "/movies" ? (
        (visibleFilms.length > 0) && (visibleFilms.length > count) ? (
          <button onClick={addMoreMovies} className="button movies-list__button">Ещё</button>
        ) : (
          ""
        )
      ) : (
        <div className="movies-list__devider"></div>
      )}
    </section>
  );
}

export default MoviesCardList;
