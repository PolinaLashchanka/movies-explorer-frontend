import './FilterCheckbox.css';

function FilterCheckbox() {
    return(
        <div className="checkbox">
            <label for="short-films" className="checkbox__label">
                <input type="checkbox" className="checkbox__custom" id="short-films" />
                <span className="checkbox__pseudo-item"></span>
                <span className="checkbox__text">Короткометражки</span>
            </label>
        </div>

    );
}

export default FilterCheckbox;