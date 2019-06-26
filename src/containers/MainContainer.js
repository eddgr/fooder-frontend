import React from 'react'
import VenueContainer from './VenueContainer'

import { API_SECRET } from '../api'
const AUTH_API = 'http://localhost:8000'
const BACKEND_API = 'http://localhost:8000/api/v1'

export default class MainContainer extends React.Component {
  state = {
    currentUser: '',

    username: '',
    password: '',
    loggedIn: false
  }

  componentDidMount() {
    let getLoc = () => {
      navigator.geolocation.getCurrentPosition(position => {
        localStorage.setItem('lat', position.coords.latitude)
        localStorage.setItem('long', position.coords.longitude)
      })
    }

    getLoc()

    if (localStorage.lat && localStorage.long && this.state.on) {
      fetch(`https://api.foursquare.com/v2/venues/explore?section=food&ll=${localStorage.getItem('lat')},${localStorage.getItem('long')}&client_id=${API_SECRET.id}&client_secret=${API_SECRET.secret}&v=${API_SECRET.version}`)
        .then(r => r.json())
    }

    // check if logged in

    if (!!localStorage.token) {
      fetch(AUTH_API + '/profile', {
        method: 'POST',
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
      .then(r => r.json())
      .then(data => {
        if (!!data.username) {
          localStorage.setItem("user_id", data.id)

          this.setState({
            currentUser: data.id,
            loggedIn: true
          })
        }
      })
    } // end if
  } // end componentDidMount

  // HELPER FUNCTIONS
  handleLoginChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLogOut = () => {
    this.setState({
      loggedIn: false
    })

    localStorage.clear()
  }

  handleSubmitAuthForm = event => {
    event.preventDefault()
    switch(event.target.name) {
      case "signup":
        fetch(BACKEND_API + '/users', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
          })
        })
          .then(r => r.json())
          .then(data => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('user_id', data.id)
          })
        // end fetch
        this.setState({
          username: '',
          password: '',
          loggedIn: true
        })
        break
      case "login":
        fetch(AUTH_API + '/login', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
          })
        })
          .then(r => r.json())
          .then(data => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('user_id', data.id)
            this.setState({
              currentUser: data.id,
              username: '',
              password: '',
              loggedIn: true
            })
          })
        // end fetch
        break
      default:
        console.log("boop")
    }
  }
  // end HELPER FUNCTIONS

  render() {
    return (
      <div className="m-4">
        {
          this.state.loggedIn ?
          <>
            <button onClick={() => this.handleLogOut()}>Log Out</button>
            <VenueContainer />
          </>
        :
          <form>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleLoginChange}
              placeholder="username"
              type="text" />
            <input
              name="password"
              value={this.state.password}
              onChange={this.handleLoginChange}
              placeholder="password"
              type="password" />
            <br />
            <button
              type="submit"
              name="signup"
              onClick={this.handleSubmitAuthForm}>Sign Up</button>
            <button
              type="submit"
              name="login"
              onClick={this.handleSubmitAuthForm}>Log In</button>
          </form>
        }
      </div>
    )
  }
}
