import "./PageNotFound.css";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigation = useNavigate();
  function goBack() {
    navigation(-1);
  }
  return (
    <main className="not-found">
      <section>
        <h2 className="not-found__header">404</h2>
        <p className="not-found__text">Страница не найдена</p>
        <button onClick={goBack} className="not-found__button">
          Назад
        </button>
      </section>
    </main>
  );
}

export default PageNotFound;
