import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({visibleFilms}) {
    return (
        <section className="main saved-movies">
            <SearchForm />
            <MoviesCardList visibleFilms={visibleFilms}/>
        </section>
    );
}

export default SavedMovies;
