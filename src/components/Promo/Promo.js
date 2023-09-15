import "./Promo.css";
import logo from "../../images/promo-logo.svg";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container container">
        <img className="promo__image" src={logo} alt="картинка земного шара" />
        <div className="promo__text">
          <h1 className="promo__header">
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <p className="promo__paragraph">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <a className="promo__button link" href="#about-project">
            Узнать больше
          </a>
        </div>
      </div>
    </section>
  );
}

export default Promo;
