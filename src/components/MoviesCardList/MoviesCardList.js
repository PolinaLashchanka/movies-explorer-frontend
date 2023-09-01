import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({films}) {
  return (
    <section className="movies-list">
      <div className="movies-list__container">
        {films.map((film) => (
          <MoviesCard key={film.id} {...film} />
        ))}
      </div>
      <button className="button movies-list__button">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
