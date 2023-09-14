import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({
  searchShortMovies,
  searchWord,
  setSearchWord,
  handleChange,
  handleSubmit,
  short,
  className,
  setClassName
}) {

  return (
    <section className="search-form">
      <form className="search-form__form">
        <div className="search-form__input-container">
          <input
            id="input-film-search"
            className="search-form__input"
            name="searchWord"
            type="text"
            minLength="2"
            maxLength="200"
            placeholder="Фильм"
            onChange={handleChange}
            value={searchWord}
            required
            onFocus={() => {
              setSearchWord('');
              setClassName('');}}
          />
          <button className="button search-form__button" onClick={handleSubmit}>
            Поиск
          </button>
        </div>
        <span
          id="input-film-search-error"
          className={`search-form__input-error ${className}`}
        >Нужно ввести ключевое слово</span>
      </form>
      <FilterCheckbox searchShortMovies={searchShortMovies} short={short} />
    </section>
  );
}

export default SearchForm;
