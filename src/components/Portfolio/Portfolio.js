import "./Portfolio.css";
import linkArrow from "../../images/arrow.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__link portfolio__link-line">
          <a
            className="portfolio__link-item  link"
            href="https://github.com/PolinaLashchanka/how-to-learn"
            target="_blank"
            rel="noreferrer"
          >
          <p className="portfolio__link-name">Статичный сайт</p>
            <img
              src={linkArrow}
              alt="ссылка на сайт ввиде стрелки"
              className="portfolio__link-image"
            />
          </a>
        </li>
        <li className="portfolio__link portfolio__link-line">
          <a
            className="portfolio__link-item  link"
            href="https://github.com/PolinaLashchanka/russian-travel"
            target="_blank"
            rel="noreferrer"
          >
          <p className="portfolio__link-name">Адаптивный сайт</p>
            <img
              src={linkArrow}
              alt="ссылка на сайт ввиде стрелки"
              className="portfolio__link-image"
            />
          </a>
        </li>
        <li className="portfolio__link">
          <a
            className="portfolio__link-item  link"
            href="https://github.com/PolinaLashchanka/react-mesto-auth"
            target="_blank"
            rel="noreferrer"
          >
          <p className="portfolio__link-name">Одностраничное приложение</p>
            <img
              src={linkArrow}
              alt="ссылка на сайт ввиде стрелки"
              className="portfolio__link-image"
            />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
