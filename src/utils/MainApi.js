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
      return fetch(`${this._url}/movies`, {
        headers: this._headers,
      }).then((res) => this._checkError(res));
    }
  
    // getSavedFilms() {
    //   return fetch(`${this._url}saved-films`, {
    //     headers: this._headers,
    //   }).then((res) => this._checkError(res));
    // }
  }
  
  const mainApi = new Api({
      url: "http://localhost:3000",
      headers: {
        "content-type": "application/json",
      },
    });
    
    export default mainApi;