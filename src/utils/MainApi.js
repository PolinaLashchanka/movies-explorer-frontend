import checkResponse from "./checkResponse";

const BASE_URL = "https://api.films-search.students.nomoreparties.co";

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  };
}

export function getSavedMovies() {
  return request(`${BASE_URL}/movies`, {
    method: "GET",
    headers: getHeaders(),
  });
} 

export function saveMovie(film) {
  const {country, director, duration, year, description, image, trailerLink, nameRU, nameEN, id} = film
  return request(`${BASE_URL}/movies`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      country, director, duration, year, description, image, trailerLink, nameRU, nameEN, id
    }),
  });
}

export function deleteMovie(id) {
  return request(`${BASE_URL}/movies/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
}

export function editProfile(userName, userEmail) {
  return request(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({
      name: userName,
      email: userEmail,
    }),
  });
}

export function register(name, email, password) {
  return request(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });
}

export function authorize(email, password) {
  return request(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

export function checkToken(token) {
  return request(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
