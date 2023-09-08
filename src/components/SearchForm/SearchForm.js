import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({
  searchShortMovies,
  searchWord,
  handleChange,
  handleSubmit,
  short
}) {
  return (
    <section className="search-form">
      <form className="search-form__form">
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
        />
        <span
          id="input-film-search-error"
          className="search-form__input-error"
        ></span>
        <button className="button search-form__button" onClick={handleSubmit}>
          Поиск
        </button>
      </form>
      <FilterCheckbox searchShortMovies={searchShortMovies} short={short}/>
    </section>
  );
}

export default SearchForm;
