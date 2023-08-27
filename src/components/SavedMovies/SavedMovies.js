import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({films}) {
    return (
        <main className="movies">
            <SearchForm />
            <MoviesCardList films={films}/>
        </main>
    );
}

export default SavedMovies;
