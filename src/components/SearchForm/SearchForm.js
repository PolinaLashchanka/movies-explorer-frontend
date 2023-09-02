import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__form">
        <input
          id="input-film-search"
          className="search-form__input"
          type="text"
          minLength="2"
          maxLength="200"
          placeholder="Фильм"
          required
        />
        <span id="input-film-search-error" className="search-form__input-error"></span>
        <button className="button search-form__button" >Поиск</button>
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;
