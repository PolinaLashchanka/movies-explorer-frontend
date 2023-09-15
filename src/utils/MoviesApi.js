class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkError(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getFilms() {
    return fetch(`${this._url}/`, {
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }

  getSavedFilms() {
    return fetch(`${this._url}saved-films`, {
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }
}

const moviesApi = new Api({
  url: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "content-type": "application/json",
  },
});

export default moviesApi;
