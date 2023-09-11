import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./AuthorizationForm.css";
import { useState } from "react";
import { useValidationError } from "../../hooks/useValidationError";

function AuthorizationForm({
  header,
  buttonName,
  formText,
  path,
  linkText,
  handleChange,
  name,
  email,
  password,
  handleSubmit,
  serverError,
  setServerError,
}) {
  const [nameClass, setNameClass] = useState("");
  const [emailClass, setEmailClass] = useState("");
  const [passwordClass, setPasswordClass] = useState("");

  const {
    hidden,
    handleNameErrorMessage,
    handleEmailErrorMessage,
    handlePasswordErrorMessage,
    checkError,
    errorNameValue,
    errorEmailValue,
    errorPasswordValue,
    formValid,
  } = useValidationError(path);

  return (
    <form className="form" noValidate onSubmit={handleSubmit}>
      <Link to="/" className="form__logo">
        <img src={logo} alt="логотип" />
      </Link>
      <h2 className="form__header">{header}</h2>
      <div
        className={`form__input-container ${
          path === "/signup" ? "form__input-container_margin" : ""
        }`}
      >
        <label htmlFor="authorization-name" className={`form__label ${hidden}`}>
          Имя
        </label>
        <input
          id="authorization-name"
          className={`form__input ${hidden} ${
            nameClass === "visible" ? `form__input_red` : ""
          }`}
          type="text"
          name="name"
          onChange={(e) => handleChange(e, handleNameErrorMessage)}
          onBlur={(e) => checkError(e, handleNameErrorMessage, setNameClass)}
          onFocus={() => {
            setNameClass("");
            setServerError("");
          }}
          value={name}
          required
        />
        <span
          id="authorization-name-error"
          className={`error form__input-error ${hidden} ${nameClass}`}
        >
          {errorNameValue}
        </span>
        <label htmlFor="authorization-email" className="form__label">
          E-mail
        </label>
        <input
          id="authorization-email"
          className={`form__input ${
            emailClass !== "" ? `form__input_red` : ""
          }`}
          type="email"
          name="email"
          onChange={(e) => handleChange(e, handleEmailErrorMessage)}
          onBlur={(e) => checkError(e, handleEmailErrorMessage, setEmailClass)}
          onFocus={() => {
            setEmailClass("");
            setServerError("");
          }}
          value={email}
          required
        />
        <span
          id="authorization-email-error"
          className={`error form__input-error ${emailClass}`}
        >
          {errorEmailValue}
        </span>
        <label htmlFor="authorization-password" className="form__label">
          Пароль
        </label>
        <input
          id="authorization-password"
          className={`form__input ${
            passwordClass !== "" ? `form__input_red` : ""
          }`}
          type="password"
          name="password"
          onChange={(e) => handleChange(e, handlePasswordErrorMessage)}
          onBlur={(e) =>
            checkError(e, handlePasswordErrorMessage, setPasswordClass)
          }
          onFocus={() => {
            setPasswordClass("");
            setServerError("");
          }}
          value={password}
          required
        />
        <span
          id="authorization-password-error"
          className={`error form__input-error ${passwordClass}`}
        >
          {errorPasswordValue}
        </span>
      </div>
      <div className="form__button-container">
        <h2 className="server-error">{serverError ? serverError : ""}</h2>
        <button
          type="submit"
          disabled={!formValid}
          className="button form__button"
        >
          {buttonName}
        </button>
        <p className="form__text">
          {formText}
          <span>
            <Link
              to={path}
              className="form__link link"
              onClick={() => setServerError("")}
            >
              {linkText}
            </Link>
          </span>
        </p>
      </div>
    </form>
  );
}

export default AuthorizationForm;
