let API_URL
let BACKEND_API
let WEBSOCKET

// check whether in production or development mode
if (process.env.NODE_ENV === "production") {
  API_URL = 'https://fooder-app-backend.herokuapp.com'
  BACKEND_API = 'https://fooder-app-backend.herokuapp.com/api/v1/'
  WEBSOCKET = "wss://fooder-app-backend.herokuapp.com/cable"
} else {
  API_URL = 'http://localhost:8000'
  BACKEND_API = 'http://localhost:8000/api/v1/'
  WEBSOCKET = "ws://localhost:8000/cable"
}

const webSocket = () => {
  return WEBSOCKET
}

const initialLoad = () => {
  return fetch(API_URL + '/profile', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify({
      lat: localStorage.getItem("lat"),
      long: localStorage.getItem("long")
    })
  })
}

const fetchRestaurants = () => {
  return fetch(BACKEND_API + 'restaurants', {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: localStorage.getItem("token")
    }
  })
    .then(r => r.json())
}

const likeDislikeReq = venueObj => {
  return fetch(BACKEND_API + 'favorites', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify(venueObj)
  })
}

const unlikeReq = venueObj => {
  return fetch(BACKEND_API + `favorites/${venueObj.restaurant_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify(venueObj)
  })
}

const signUpReq = (username, password) => {
  return fetch(BACKEND_API + 'users', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: localStorage.getItem("token")
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
      Accept: "application/json",
      Authorization: localStorage.getItem("token")
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
  return fetch(BACKEND_API + `restaurants/${venue_id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: localStorage.getItem("token")
    }
  })
    .then(r => r.json())
}

const sendMessage = (user_id, restaurant_id, content) => {
  return fetch(BACKEND_API + 'messages', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify({
      user_id,
      restaurant_id,
      content
    })
  })
}

export default { webSocket, initialLoad, fetchRestaurants, likeDislikeReq, unlikeReq, signUpReq, logInReq, fetchVenue, sendMessage }
