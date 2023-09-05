import { useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const [edit, setEdit] = useState(false);

  function editProfile() {
    setEdit(true);
  }

  return (
    <main className="profile">
      <section>
        <h2 className="profile__header">Привет, Полина!</h2>
        <form className="profile__form">
          <input
            id="edit-name"
            className="profile__form-input "
            type="text"
            defaultValue="Полина"
            name="profile-name"
            minLength="2"
            maxLength="200"
            required
          />
          <span
            id="edit-name-error"
            className="error profile__form-input-error profile__form-input-name"
          ></span>
          <input
            id="edit-email"
            className="profile__form-input"
            type="text"
            defaultValue="pochta@yandex.ru"
            name="profile-email"
            minLength="2"
            maxLength="200"
            required
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
              <Link to="/" replace className="profile__exit-button link">
                Выйти из аккаунта
              </Link>
            </>
          ) : (
            <button className="button profile__save-button">Сохранить</button>
          )}
        </form>
      </section>
    </main>
  );
}

export default Profile;
