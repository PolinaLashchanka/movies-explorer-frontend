import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="search-form">
      <form className="form">
        <input
          id="input-film-search"
          className="form__input"
          type="text"
          minLength="2"
          maxLength="200"
          placeholder="Фильм"
          required
        />
        <span id="input-film-search-error" className="form__input_error"></span>
        <button className="form__button">Поиск</button>
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;
