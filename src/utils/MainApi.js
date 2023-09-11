import checkResponse from "./checkResponse";

const BASE_URL = "http://localhost:3000";

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}


// function getHeaders() {
//   return {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//   };
// }

// export function getUserInfo() {
//   return request(`${BASE_URL}/users/me`, {
//     headers: getHeaders(),
//   });
// }


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
