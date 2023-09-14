import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({savedMovies}) {
    return (
        <section className="main saved-movies">
            <SearchForm />
            <MoviesCardList visibleMovies={savedMovies}/>
        </section>
    );
}

export default SavedMovies;
