import React from 'react';
import { API_SECRET } from './api'

import { connect } from 'react-redux'
import { ActionCableConsumer } from 'react-actioncable-provider'

const BACKEND_API = 'http://localhost:8000/api/v1'

class App extends React.Component {
  state = {
    venues: [], // move to redux
    on: false,

    currentUser: '',
    currentVenue: 1,
    currentMessage: ''
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
        // .then(data => {
        //   this.setState({
        //     venues: data.response.groups[0].items
        //   })
        // })
    }

    fetch(BACKEND_API + `/restaurants/${this.state.currentVenue}`)
      .then(r => r.json())
      .then(data => {
        this.props.loadMessages(data)
        let chatBox = document.querySelector("#chat-box")
        chatBox.scrollTop = chatBox.scrollHeight
      })
  }

  pressMe = () => {
    // ActionCable
    return fetch('http://localhost:8000/api/v1/users')
      .then(r => r.json())
  }

  sendMessage = () => {
    return fetch('http://localhost:8000/api/v1/messages', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user_id: localStorage.getItem('user_id'),
        restaurant_id: this.state.currentVenue,
        content: this.state.currentMessage
      })
    })
      // .then(r => r.json())
  }

  handleChange = event => {
    this.setState({
      currentMessage: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.sendMessage()
    this.setState({
      currentMessage: ''
    })
  }

  handleReceived = data => {
    let chatBox = document.querySelector("#chat-box")
    switch(data.type) {
      case 'SEND_MESSAGE':
        this.props.sendMessage(data.payload)
        chatBox.scrollTop = chatBox.scrollHeight
        break
      default:
        console.log(data)
    }
  }

  render() {
    // debugger
    console.log('App state', this.state)
    return (
      <div>
        Hello from App.
        <br />
        Venues: {this.state.venues.length}
        <br />
        <button onClick={() => this.pressMe()}>Press it</button>
        <button onClick={() => this.sendMessage()}>Message it</button>

        <h2>Send message here</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={this.state.currentMessage}
            type="text" />
          <input type="submit" />
        </form>

        <ActionCableConsumer
          channel={{ channel: "ChatThreadChannel" }}
          onReceived={data => this.handleReceived(data)} />

        <h2>Show message here</h2>
        <div id="chat-box" className="chat-box">
          {this.props.state.messages.map(message => {
            return (<div key={message.id}>
              <strong>{message.username} {message.created_at}: </strong>
              {message.content}
            </div>)
          })}
        </div>
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
