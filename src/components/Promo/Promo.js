import "./Promo.css";
import logo from "../../images/promo-logo.svg";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__text">
        <h1 className="promo__header">
          Учебный проект студента факультета Веб&#8209;разработки.
        </h1>
        <p className="promo__paragraph">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <button className="promo__button">Узнать больше</button>
      </div>
      <img className="promo__image" src={logo} alt="картинка земного шара" />
    </section>
  );
}

export default Promo;
