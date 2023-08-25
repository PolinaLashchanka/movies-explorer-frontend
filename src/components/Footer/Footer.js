import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__header">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__info">
        <p className="footer__date">© 2020</p>
        <div className="footer__yandex">
          <p className="footer__text">Яндекс.Практикум</p>
          <a
            className="footer__github"
            href="https://github.com/Yandex-Practicum"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
