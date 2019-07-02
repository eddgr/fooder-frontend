const API_URL = 'http://localhost:8000'
const BACKEND_API = 'http://localhost:8000/api/v1/'

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: localStorage.getItem("token")
}

const fetchRestaurants = () => {
  return fetch(BACKEND_API + 'restaurants', headers)
    .then(r => r.json())
}

const likeDislikeReq = venueObj => {
  return fetch(BACKEND_API + 'favorites', {
    method: 'POST',
    headers,
    body: JSON.stringify(venueObj)
  })

}

const signUpReq = () => {

}

const logInReq = () => {

}

const fetchMessages = () => {

}

export default { fetchRestaurants, likeDislikeReq, signUpReq, logInReq, fetchMessages }
