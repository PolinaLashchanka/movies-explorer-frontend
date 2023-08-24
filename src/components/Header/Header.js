import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import icon from "../../images/icon__COLOR_icon-main.svg";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

function Header() {
  const location = useLocation();
  const path = location.pathname;
  const logoImgClass = path.startsWith("/sign")
    ? "header__logo_authorization"
    : "";

  const logoLink = (
    <Link to="/">
      <img className={`header__logo ${logoImgClass}`} src={logo} alt="logo" />
    </Link>
  );

  const [nav, setNav] = useState(false);
  const active = nav ? 'active' : ' ';
  const closeNav = () => setNav(!nav);

  return (
    <>
      {path === "/" && (
        <header className="header header_main">
          {logoLink}
          <div className="header__link-container">
            <Link to="/signup" replace className="header__link">
              Регистрация
            </Link>
            <Link
              to="/signin"
              replace
              className="header__link header__link_signin"
            >
              Войти
            </Link>
          </div>
        </header>
      )}
      {(path === "/saved-movies" ||
        path === "/movies" ||
        path === "/profile") && (
        <header className="header">
          {logoLink}
          <div className={`header__burger-container ${active}`}></div>
          <div className={`header__link-container header__link-burger-container ${active}`}>
            <Link onClick={closeNav} to="/" className="header__link header__burger-link header__main-burger-link">Главная</Link>
            <Link onClick={closeNav} to="/movies" className="header__link header__burger-link">
              Фильмы
            </Link>
            <Link onClick={closeNav} to="/saved-movies" className="header__link header__burger-link">
              Сохраненные фильмы
            </Link>
            <Link onClick={closeNav} to="/profile" className="header__link header__burger-link">
              <div className="header__profile">
                <p className="header__profile-text">Аккаунт</p>
                <img
                  className="header__profile-icon"
                  src={icon}
                  alt="profile icon"
                />
              </div>
            </Link>
          </div>
          <div onClick={closeNav} className="header__burger-btn">
            {nav ? <AiOutlineClose size={27} />: <AiOutlineMenu size={35} />}
          </div>
        </header>
      )}
      {(path === "/signup" || path === "/signin") && (
        <header className="header header_authorization">{logoLink}</header>
      )}
    </>
  );
}

export default Header;
