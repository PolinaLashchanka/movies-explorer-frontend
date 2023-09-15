import "./Techs.css";
import SectionHeader from "../SectionHeader/SectionHeader";

function Techs() {
  return (
    <section className="techs">
      <div className="techs__container container">
        <SectionHeader header="Технологии" />
        <h2 className="techs__header">7 технологий</h2>
        <p className="techs__description">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__icons">
          <li className="techs__icon">HTML</li>
          <li className="techs__icon">CSS</li>
          <li className="techs__icon">JS</li>
          <li className="techs__icon">React</li>
          <li className="techs__icon">Git</li>
          <li className="techs__icon">Express.js</li>
          <li className="techs__icon">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
