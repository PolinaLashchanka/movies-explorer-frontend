import { useState } from "react";
import "./MoviesCard.css";

function MoviesCard(props) {
    const [ isSaved, setIsSaved ] = useState(false);

    function save() {
        setIsSaved(!isSaved)
    }

    return(
        <div className="card">
            <div className="card__header">
                <h2 className="card__name">{props.nameRU}</h2>
                <p className="card__duration">{props.duration}</p>
            </div>
            <div className="card__image" style={{backgroundImage: 'url(' + props.url + ')'}}></div>
            <button onClick={save} className={`card__save-button ${isSaved ? 'card__save-button_saved' : ''}`}>{isSaved ? '' : 'Сохранить'}</button>
        </div>
    );
}

export default MoviesCard;