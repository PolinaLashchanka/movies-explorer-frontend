import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import icon from "../../images/icon__COLOR_icon-main.svg";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

function Header({ loggedIn, setEdit, setEditMessage, getAllSavedMovies }) {
  const location = useLocation();
  const path = location.pathname;

  const logoLink = (
    <Link to="/">
      <img className="header__logo" src={logo} alt="логотип" />
    </Link>
  );

  const [nav, setNav] = useState(false);
  const active = nav ? "active" : " ";
  const closeNav = () => {
    setNav(!nav);
    setEdit(false);
    setEditMessage('');
  };

  return (
    <>
      {path === "/" && !loggedIn && (
        <header className="header header_main">
          {logoLink}
          <div className="header__link-container">
            <Link to="/signup" replace className="header__link link">
              Регистрация
            </Link>
            <Link
              to="/signin"
              replace
              className="header__link header__link_signin link"
            >
              Войти
            </Link>
          </div>
        </header>
      )}
      {loggedIn && (
        <header className={`header ${path === "/" && "header_main"}`}>
          {logoLink}
          <div className={`header__burger-overlay ${active}`}></div>
          <div
            className={`header__link-container header__link-burger-container ${active}`}
          >
            <div className="header__movie-link-container">
              <Link
                onClick={closeNav}
                to="/"
                className="link header__link header__burger-link header__main-burger-link"
              >
                Главная
              </Link>
              <Link
                onClick={closeNav}
                to="/movies"
                className="header__link header__burger-link link"
                style={path === "/movies" ? { fontWeight: 500 } : {}}
              >
                Фильмы
              </Link>
              <Link
                onClick={() => {
                  getAllSavedMovies();
                  closeNav();}}
                to="/saved-movies"
                className="header__link header__burger-link link"
                style={path === "/saved-movies" ? { fontWeight: 500 } : {}}
              >
                Сохраненные фильмы
              </Link>
            </div>
            <div className="header__profile">
              <Link
                onClick={closeNav}
                to="/profile"
                className="header__link header__burger-link link"
                style={path === "/profile" ? { fontWeight: 500 } : {}}
              >
                <p className="header__profile-text">Аккаунт</p>
                <img
                  className={`header__profile-icon ${
                    path === "/" && "header__profile-icon_main"
                  }`}
                  src={icon}
                  alt="profile icon"
                />
              </Link>
            </div>
          </div>
          <div onClick={closeNav} className="header__burger-btn">
            {nav ? (
              <AiOutlineClose size={27} className="header__btn_fixed" />
            ) : (
              <AiOutlineMenu size={29} />
            )}
          </div>
        </header>
      )}
      {(path === "/signup" || path === "/signin") && (
        <header className="header"></header>
      )}
    </>
  );
}

export default Header;
