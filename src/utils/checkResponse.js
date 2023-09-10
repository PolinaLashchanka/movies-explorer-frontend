async function checkResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(await res.json());
  }
  
  export default checkResponse;
  