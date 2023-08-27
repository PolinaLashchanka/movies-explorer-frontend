import { useState, useEffect } from "react";

import "./MoviesCardList.css";
import api from "../../utils/Api";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    api
      .getFilms()
      .then((films) => setFilms(films))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="movies-list">
      <div className="movies-list__container">
        {films.map((film) => (
          <MoviesCard key={film.id} {...film} />
        ))}
      </div>
      <button className="movies-list__button">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
