import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard(props) {
    const location = useLocation();
    const path = location.pathname;
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
            <div className="card__image" style={{backgroundImage: `url(${props.url})`}}></div>
            {path === '/movies' && (<button onClick={save} className={`card__save-button ${isSaved ? 'card__save-button_saved' : ''}`}>{isSaved ? '' : 'Сохранить'}</button>)}
            {path === '/saved-movies' && (<button className="card__save-button">&#10006;</button>)}
        </div>
    );
}

export default MoviesCard;