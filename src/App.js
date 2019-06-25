import React from 'react';
import { API_SECRET } from './api'

import { ActionCableConsumer } from 'react-actioncable-provider'

class App extends React.Component {
  state = {
    venues: [],
    on: false
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
    return fetch('http://localhost:8000/users')
      .then(r => r.json())
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
        <ActionCableConsumer
          channel={{ channel: "ChatThreadChannel" }}
          onReceived={users => console.log(users)} />
      </div>
    );
  }
}

export default App;
