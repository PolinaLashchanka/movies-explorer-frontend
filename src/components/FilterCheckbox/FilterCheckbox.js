import './FilterCheckbox.css';

function FilterCheckbox({searchShortMovies}) {
    return(
        <div className="checkbox">
            <label htmlFor="short-films" className="checkbox__label">
                <input type="checkbox" className="checkbox__custom" id="short-films" onClick={searchShortMovies}/>
                <span className="checkbox__pseudo-item"></span>
                <span className="checkbox__text">Короткометражки</span>
            </label>
        </div>
    );
}

export default FilterCheckbox;