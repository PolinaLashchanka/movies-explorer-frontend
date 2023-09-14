import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

function MoviesCardList({
  visibleMovies,
  addMoreMovies,
  count,
  short,
  saveMovie,
  savedMovies,
  deleteMovie,
}) {
  const location = useLocation();
  const path = location.pathname;
  const filteredMovies = short
    ? visibleMovies.filter((film) => film.duration < 41)
    : visibleMovies;

  return (
    <>
      {filteredMovies.length === 0 ? (
        (path === '/movies' ? (<h2 className="movies__no-result-message">Ничего не найдено.</h2>) : (<h2 className="movies__no-result-message">Нет сохраненных фильмов.</h2>))
      ) : (
        <section className="movies-list">
          <div className="movies-list__container">
            {filteredMovies.slice(0, count).map((film) => (
              <MoviesCard
                key={path === "/movies" ? film.id : film.movieId}
                film={film}
                saveMovie={saveMovie}
                savedMovies={savedMovies}
                deleteMovie={deleteMovie}
              />
            ))}
          </div>
          {path === "/movies" ? (
            filteredMovies.length > 0 && filteredMovies.length > count && (
              <button
                onClick={addMoreMovies}
                className="button movies-list__button"
              >
                Ещё
              </button>
            )
          ) : (
            <div className="movies-list__devider"></div>
          )}
        </section>
      )}
    </>
  );
}

export default MoviesCardList;
