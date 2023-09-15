import "./AboutMe.css";
import SectionHeader from "../SectionHeader/SectionHeader";

function AboutMe() {
  return (
    <section className="about-me container">
      <SectionHeader header="Студент" />
      <div className="about-me__container">
        <div className="about-me__text-container">
          <h2 className="about-me__name">Полина</h2>
          <h3 className="about-me__description">
            Фронтенд-разработчик, 30 лет
          </h3>
          <p className="about-me__info">
            Я родом из Минска, но сейчас вместе с мужем живу в Варшаве. Мой путь
            в разработке начался почти год назад благодаря мужу, который помог
            приобрести уверенность, что разработка - это моё. Я ушла с работы
            администратора, и полностью посвятила себя новой професии. Из софт
            скилов у меня преобладает трудолюбие, жажда к изучению нового и
            комуникабельность.
          </p>
          <a
            className="about-me__github link"
            href="https://github.com/PolinaLashchanka"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <div className="about-me__image"></div>
      </div>
    </section>
  );
}

export default AboutMe;
