import React from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useValidationError } from "../../hooks/useValidationError";
import "./Profile.css";

function Profile({ onSignOut, path, onHandleProfileChange, editProfile, edit, editMessage }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [nameValue, setNameValue] = useState(currentUser.name);
  const [emailValue, setEmailValue] = useState(currentUser.email);
  const [disabledButton, setDisabledBitton] = useState(true);

  const {
    handleNameErrorMessage,
    handleEmailErrorMessage,
    errorNameValue,
    errorEmailValue,
  } = useValidationError(path);

  const handleNameChange = (e) => {
    const { value } = e.target;
    setNameValue(value);
    handleNameErrorMessage(e);
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmailValue(value);
    handleEmailErrorMessage(e);
  };

  useEffect(() => {
    nameValue === currentUser.name && emailValue === currentUser.email
      ? setDisabledBitton(true)
      : setDisabledBitton(false);
  }, [nameValue, emailValue]);

  function handleSubmit(e) {
    e.preventDefault();
    onHandleProfileChange(nameValue, emailValue);
    setDisabledBitton(true);
  }

  return (
    <section className="profile">
      <h2 className="profile__header">{`Привет, ${currentUser.name}!`}</h2>
      <form className="profile__form" onSubmit={handleSubmit}>
        <input
          id="edit-name"
          className={`profile__form-input ${errorNameValue && "form__input_red"}`}
          type="text"
          value={nameValue}
          onChange={handleNameChange}
          name="name"
          minLength="2"
          maxLength="200"
          required
          disabled={!edit}
        />
        <span
          id="edit-name-error"
          className={`error profile__form-input-error profile__form-input-name`}
        >
          {errorNameValue}
        </span>
        <input
          id="edit-email"
          className={`profile__form-input ${errorEmailValue && "form__input_red"}`}
          type="text"
          value={emailValue}
          onChange={handleEmailChange}
          name="email"
          minLength="2"
          maxLength="200"
          required
          disabled={!edit}
        />
        <span
          id="edit-email-error"
          className={`error profile__form-input-error profile__form-input-email`}
        >
          {errorEmailValue}
        </span>
        {!edit ? (
          <>
            <h2 className="profile__message">{editMessage}</h2>
            <button
              onClick={editProfile}
              className="profile__button profile__edit-button link"
            >
              Редактировать
            </button>
            <Link
              onClick={onSignOut}
              to="/"
              replace
              className="profile__exit-button link"
            >
              Выйти из аккаунта
            </Link>
          </>
        ) : (
          <button
            className="button profile__save-button"
            disabled={disabledButton}
          >
            Сохранить
          </button>
        )}
      </form>
    </section>
  );
}

export default Profile;
