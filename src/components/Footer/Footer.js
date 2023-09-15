import "./Footer.css";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      {(path === "/" || path === "/movies" || path === "/saved-movies") && (
        <footer className="footer container">
          <h2 className="footer__header">
            Учебный проект Яндекс.Практикум х BeatFilm.
          </h2>
          <div className="footer__info">
            <p className="footer__date">© 2023</p>
            <div className="footer__yandex">
              <a
                className="footer__yandex-link link"
                href="https://practicum.yandex.ru/"
                target="_blank"
                rel="noreferrer"
              >
                Яндекс.Практикум
              </a>
              <a
                className="footer__yandex-link link"
                href="https://github.com/Yandex-Practicum"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}

export default Footer;
