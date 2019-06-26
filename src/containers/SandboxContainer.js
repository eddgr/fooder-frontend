import React from 'react'

import { connect } from 'react-redux'
import { ActionCableConsumer } from 'react-actioncable-provider'

import { API_SECRET } from '../api'
const AUTH_API = 'http://localhost:8000'
const BACKEND_API = 'http://localhost:8000/api/v1'

class SandboxContainer extends React.Component {
  state = {
    venues: [], // move to redux
    on: false,

    currentUser: '',
    currentVenue: 2,
    currentMessage: '',

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

          this.showChat()
        }
      })
    } // end if
  } // end componentDidMount

  // HELPER FUNCTIONS

  showChat = () => {
    return fetch(BACKEND_API + `/restaurants/${this.state.currentVenue}`)
      .then(r => r.json())
      .then(data => {
        this.props.loadMessages(data)
        this.scrollToBottom()
      })
  }

  scrollToBottom = () => {
    const chatBox = document.querySelector("#chat-box")
    chatBox.scrollTop = chatBox.scrollHeight
  }

  sendMessage = () => {
    return fetch('http://localhost:8000/api/v1/messages', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user_id: this.state.currentUser,
        restaurant_id: this.state.currentVenue,
        content: this.state.currentMessage
      })
    })
  }

  handleMessageChange = event => {
    this.setState({
      currentMessage: event.target.value
    })
  }

  handleLoginChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmitMessage = event => {
    event.preventDefault()
    this.sendMessage()
    this.setState({
      currentMessage: ''
    })
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
            this.showChat()
          })

        break
      default:
        console.log("boop")
    }
  }

  handleReceived = data => {
    switch(data.type) {
      case 'SEND_MESSAGE':
        this.props.sendMessage(data.payload)
        this.scrollToBottom()
        break
      default:
        console.log(data)
    }
  }

  handleLogOut = () => {
    this.setState({
      loggedIn: false
    })

    localStorage.clear()
  }

  // end HELPER FUNCTIONS

  render() {
    return (
      <div className="m-4 row">
        SandboxContainer
        <div className="col-6">
          Current User ID: {localStorage.getItem('user_id')}
          <br />
          Venues: {this.state.venues.length}
        </div>
        {
          this.state.loggedIn ?
          <div className="col-6">
            <ActionCableConsumer
            channel={{ channel: "ChatThreadChannel" }}
            onReceived={data => this.handleReceived(data)} />
            <button onClick={() => this.handleLogOut()}>Log Out</button>
            <h2>Show message here</h2>
            <div id="chat-box" className="chat-box">
              {this.props.state.messages.map(message => {
                return (<div key={message.id}>
                  <strong>{message.username} {message.created_at}: </strong>
                  {message.content}
                </div>)
              })}
            </div>
            <h2>Send message here</h2>
            <form onSubmit={this.handleSubmitMessage}>
              <input
                onChange={this.handleMessageChange}
                value={this.state.currentMessage}
                type="text" />
              <input type="submit" />
            </form>
          </div>
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

const mapStateToProps = state => {
  return {
    state: state.messages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: message => {
      dispatch({type: 'SEND_MESSAGE', payload: message})
    },
    loadMessages: messages => {
      dispatch({type: 'LOAD_MESSAGES', payload: messages})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SandboxContainer);
