import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

function MoviesCardList({ visibleFilms }) {
  const location = useLocation();
  const path = location.pathname;
  return (
    <section className="movies-list">
      <div className="movies-list__container">
        {visibleFilms.map((film) => (
          <MoviesCard key={film.id} {...film} />
        ))}
      </div>
      {path === '/movies' ? (<button className="button movies-list__button">Ещё</button>) : (<div className="movies-list__devider"></div>)}
    </section>
  );
}

export default MoviesCardList;
