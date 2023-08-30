import { useState } from "react";
import "./Profile.css";

function Profile() {
  const [edit, setEdit] = useState(false);

  function editProfile() {
    setEdit(true);
  }

  return (
    <main className="profile">
      <h2 className="profile__header">Привет, Полина!</h2>
      <form className="profile__form">
        <input
          id="input-profile-edit"
          className="profile__form-input "
          type="text"
          defaultValue="Полина"
          name="profile-name"
          minLength="2"
          maxLength="200"
          required
        />
        <span
          id="input-profile-edit-error"
          className="error profile__form-input_error profile__form-input_name"
        >Что-то пошло не так...</span>
        <input
          id="input-profile-edit"
          className="profile__form-input"
          type="text"
          defaultValue="pochta@yandex.ru"
          name="profile-email"
          minLength="2"
          maxLength="200"
          required
        />
        <span
          id="input-profile-edit-error"
          className="error profile__form-input_error profile__form-input_email"
        >Что-то пошло не так...</span>
        {!edit ? (
          <>
            <button
              onClick={editProfile}
              className="profile__button profile__edit-button"
            >
              Редактировать
            </button>
            <button className="profile__button profile__exit-button">
              Выйти из аккаунта
            </button>
          </>
        ) : (<button className="button profile__save-button">Сохранить</button>)}
      </form>
    </main>
  );
}

export default Profile;
