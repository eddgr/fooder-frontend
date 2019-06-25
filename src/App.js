import React from 'react';
import { API_SECRET } from './api'

import { ActionCableConsumer } from 'react-actioncable-provider'

class App extends React.Component {
  state = {
    venues: [],
    on: false,
    messages: []
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
        .then(data => {
          this.setState({
            venues: data.response.groups[0].items
          })
        })
    }
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
        user_id: 1,
        restaurant_id: 1,
        content: "Hello from the front end!"
      })
    })
      .then(r => r.json())
      .then(console.log)
  }

  renderMessage = (data) => {
    this.setState({
      messages: [...this.state.messages, data]
    })
  }

  render() {
    console.log('App state', this.state)
    return (
      <div>
        Hello from App.
        <br />
        Venues: {this.state.venues.length}
        <br />
        <button onClick={() => this.pressMe()}>Press it</button>
        <button onClick={() => this.sendMessage()}>Message it</button>
        <ActionCableConsumer
          channel={{ channel: "ChatThreadChannel" }}
          onReceived={users => this.renderMessage(users)} />
        {this.state.messages}
      </div>
    );
  }
}

export default App;
