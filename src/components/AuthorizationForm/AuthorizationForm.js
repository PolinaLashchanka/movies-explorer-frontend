import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./AuthorizationForm.css";
import { useEffect, useState } from "react";

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
}) {
  const hidden = `${path === "/signup" ? "hidden" : ""}`;
  const [formValid, setFormValid] = useState(false);
  const [nameClass, setNameClass] = useState("");
  const [emailClass, setEmailClass] = useState("");
  const [passwordClass, setPasswordClass] = useState("");
  const [errorEmailValue, setErrorEmailValue] = useState(
    "Это поле не может быть пустым"
  );
  const [errorValue, setErrorValue] = useState({
    nameError: `${path === '/signup' ? "" : "Это поле не может быть пустым"}`,
    passwordError: "Это поле не может быть пустым",
  });

  const handleErrorMessage = async (e) => {
    const { name, validationMessage } = e.target;
    setErrorValue({ ...errorValue, [`${name}Error`]: validationMessage });
    return validationMessage;
  };

  const handleEmailErrorMessage = async (e) => {
    const { value } = e.target;
    const re =
      /^((([0-9A-Za-z]{1}[-0-9A-z.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/i;
    if (value === "") {
      setErrorEmailValue("Это поле не может быть пустым");
    } else if (!re.test(String(value).toLocaleLowerCase())) {
      setErrorEmailValue("Вы ввели некорректный имейл");
    } else {
      setErrorEmailValue("");
    }
    return errorEmailValue;
  };

  function checkNameError(e) {
    handleErrorMessage(e).then((message) => {
      message === "" ? setNameClass("") : setNameClass("visible");
    });
  }

  function checkEmailError(e) {
    handleEmailErrorMessage(e).then((message) => {
      message === "" ? setEmailClass("") : setEmailClass("visible");
    });
  }

  function checkPasswordError(e) {
    handleErrorMessage(e).then((message) => {
      message === "" ? setPasswordClass("") : setPasswordClass("visible");
    });
  }

  const { nameError, passwordError } = errorValue;

  useEffect(() => {
    if (nameError || errorEmailValue || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, errorEmailValue, passwordError]);

  return (
    <form className="form" noValidate>
      <Link to="/" className="form__logo">
        <img src={logo} alt="логотип" />
      </Link>
      <h2 className="form__header">{header}</h2>
      <div className="form__input-container">
        <label htmlFor="authorization-name" className={`form__label ${hidden}`}>
          Имя
        </label>
        <input
          id="authorization1-name"
          className={`form__input ${hidden} ${
            nameClass === "visible" ? `form__input_red` : ""
          }`}
          type="text"
          name="name"
          minLength="2"
          maxLength="200"
          onChange={(e) => handleChange(e, handleErrorMessage)}
          onBlur={checkNameError}
          onFocus={() => {
            setNameClass("");
          }}
          value={name}
          required
        />
        <span
          id="authorization-name-error"
          className={`error form__input_error ${hidden} ${nameClass}`}
        >
          {nameError}
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
          onBlur={checkEmailError}
          onFocus={() => {
            setEmailClass("");
          }}
          value={email}
          required
        />
        <span
          id="authorization-email-error"
          className={`error form__input_error ${emailClass}`}
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
          minLength="5"
          maxLength="200"
          onChange={(e) => handleChange(e, handleErrorMessage)}
          onBlur={checkPasswordError}
          onFocus={() => {
            setPasswordClass("");
          }}
          value={password}
          required
        />
        <span
          id="iauthorization-password-error"
          className={`error form__input_error ${passwordClass}`}
        >
          {passwordError}
        </span>
      </div>
      <div className="form__button-container">
        <button
          disabled={!formValid}
          className={`button form__button ${
            path === "/signup" ? "form__button_margin" : ""
          }`}
        >
          {buttonName}
        </button>
        <p className="form__text">
          {formText}
          <span>
            <Link to={path} className="form__link link">
              {linkText}
            </Link>
          </span>
        </p>
      </div>
    </form>
  );
}

export default AuthorizationForm;
