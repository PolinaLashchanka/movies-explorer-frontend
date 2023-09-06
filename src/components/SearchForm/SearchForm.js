import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useState } from "react";

function SearchForm({ searchMovies, searchShortMovies }) {

  const [formValue, setFormValue] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setFormValue(value);
};

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovies(formValue);
  };

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
          value={formValue}
          required
        />
        <span id="input-film-search-error" className="search-form__input-error"></span>
        <button className="button search-form__button" onClick={handleSubmit}>Поиск</button>
      </form>
      <FilterCheckbox searchShortMovies={searchShortMovies}/>
    </section>
  );
}

export default SearchForm;
