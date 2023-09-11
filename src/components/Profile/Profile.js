import React from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile({ onSignOut }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [edit, setEdit] = useState(false);
  const [nameValue, setNameValue] = useState(currentUser.name);
  const [emailValue, setEmailValue] = useState(currentUser.email);
  const [disabledButton, setDisabledBitton] = useState(true);

  const handleNameChange = (e) => {
    const { value } = e.target;
    setNameValue(value);
  };

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmailValue(value);
  };

  function editProfile() {
    setEdit(true);
  }

  useEffect(() => {
    nameValue === currentUser.name && emailValue === currentUser.email ? setDisabledBitton(true) : setDisabledBitton(false);
  }, [nameValue, emailValue])

  return (
    <section className="profile">
      <h2 className="profile__header">Привет, Полина!</h2>
      <form className="profile__form">
        <input
          id="edit-name"
          className="profile__form-input "
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
          className="error profile__form-input-error profile__form-input-name"
        ></span>
        <input
          id="edit-email"
          className="profile__form-input"
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
          className="error profile__form-input-error profile__form-input-email"
        ></span>
        {!edit ? (
          <>
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
