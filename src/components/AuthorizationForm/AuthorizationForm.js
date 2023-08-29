import { Link } from "react-router-dom";
import "./AuthorizationForm.css";

function AuthorizationForm({header, buttonName, formText, path, linkText}) {

  const hidden = `${path === '/signup' ? 'hidden' : ''}`;
  return (
    <form className="form">
      <h2 className="form__header">{header}</h2>
      <div className="form__input-container">
        <label for="authorization-name" className={`form__label ${hidden}`}>Имя</label>
        <input
          id="authorization-name"
          className={`form__input ${hidden}`}
          type="text"
          name="authorization-name"
          minLength="2"
          maxLength="200"
          required
        />
        <span
          id="authorization-name-error"
          className={`error form__input_error ${hidden}`}
        >Что-то пошло не так...</span>
        <label for="authorization-email" className="form__label">E-mail</label>
        <input
          id="authorization-email"
          className="form__input"
          type="email"
          name="authorization-email"
          required
        />
        <span
          id="authorization-email-error"
          className="error form__input_error"
        >Что-то пошло не так...</span>
        <label for="authorization-password" className="form__label">Пароль</label>
        <input
          id="authorization-password"
          className="form__input"
          type="password"
          name="authorization-password"
          minLength="2"
          maxLength="200"
          required
        />
        <span
          id="iauthorization-password-error"
          className="error form__input_error"
        >Что-то пошло не так...</span>
      </div>
      <div className="form__button-container">
        <button className={`button form__button ${path === '/signup' ? 'form__button_margin' : ''}`}>{buttonName}</button>
        <p className="form__text">
          {formText}
          <span>
            <Link to={path} className="form__link">
              {linkText}
            </Link>
          </span>
        </p>
      </div>
    </form>
  );
}

export default AuthorizationForm;
