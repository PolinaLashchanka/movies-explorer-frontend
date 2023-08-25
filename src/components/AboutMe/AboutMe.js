import "./AboutMe.css";
import SectionHeader from "../SectionHeader/SectionHeader";

function AboutMe() {
  return (
    <section className="about-me">
      <SectionHeader header="Студент" />
      <div className="about-me__container">
        <div className="about-me__text-container">
          <h2 className="about-me__name">Полина</h2>
          <h3 className="about-me__description">Фронтенд-разработчик, 30 лет</h3>
          <p className="about-me__info">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className="about-me__github"
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
