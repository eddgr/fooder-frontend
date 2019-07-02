const API_URL = 'http://localhost:8000'
const BACKEND_API = 'http://localhost:8000/api/v1/'

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: localStorage.getItem("token")
}

const initialLoad = () => {
  return fetch(API_URL + '/profile', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      lat: localStorage.getItem("lat"),
      long: localStorage.getItem("long")
    })
  })
    .then(r => r.json())
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

const signUpReq = (username, password) => {
  return fetch(BACKEND_API + 'users', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password,
      lat: localStorage.getItem("lat"),
      long: localStorage.getItem("long")
    })
  })
    .then(r => r.json())
}

const logInReq = (username, password) => {
  return fetch(API_URL + '/login', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password,
      lat: localStorage.getItem("lat"),
      long: localStorage.getItem("long")
    })
  })
    .then(r => r.json())
}

const fetchVenue = (venue_id) => {
  return fetch(BACKEND_API + `restaurants/${venue_id}`, headers)
    .then(r => r.json())
}

const sendMessage = (user_id, restaurant_id, content) => {
  return fetch(BACKEND_API + 'messages', {
    method: "POST",
    headers,
    body: JSON.stringify({
      user_id,
      restaurant_id,
      content
    })
  })
}

export default { initialLoad, fetchRestaurants, likeDislikeReq, signUpReq, logInReq, fetchVenue, sendMessage }
