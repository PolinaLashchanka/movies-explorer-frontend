import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({visibleFilms}) {
    return (
        <main className="main saved-movies">
            <SearchForm />
            <MoviesCardList visibleFilms={visibleFilms}/>
        </main>
    );
}

export default SavedMovies;
