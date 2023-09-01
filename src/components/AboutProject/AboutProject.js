import "./AboutProject.css";
import SectionHeader from "../SectionHeader/SectionHeader";

function AboutProject() {
  return (
    <section className="about" id="about-project">
      <SectionHeader header="О проекте" />
      <div className="about__grid-text grid">
        <h3 className="grid__header">Дипломный проект включал 5 этапов</h3>
        <p className="grid__description">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <h3 className="grid__header  grid__mobile-gap">На выполнение диплома ушло 5 недель</h3>
        <p className="grid__description">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className="about__grid-timing grid">
        <div className="grid__line grid__line-one">1 неделя</div>
        <div className="grid__line grid__line-four">4 недели</div>
        <h4  className="grid__undertext">Back-end</h4>
        <h4 className="grid__undertext">Front-end</h4>
      </div>
    </section>
  );
}

export default AboutProject;
