import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__header">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__link portfolio__link-line">
          <a className="portfolio__link-item " href="#">
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__link portfolio__link-line">
          <a className="portfolio__link-item" href="#">
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__link">
          <a className="portfolio__link-item" href="#">
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
