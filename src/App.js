import React from 'react';
import NavBar from './components/NavBar'
import MainContainer from './containers/MainContainer'
import SignUpLogIn from './components/SignUpLogIn'
import TabbedBar from './components/TabbedBar'
// import Error from './components/Error'

import SandboxContainer from './containers/SandboxContainer' // storing everything here until App is cleaned up

import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

const AUTH_API = 'http://localhost:8000'

class App extends React.Component {
  componentDidMount() {
    let getLoc = () => {
      navigator.geolocation.getCurrentPosition(position => {
        localStorage.setItem('lat', position.coords.latitude)
        localStorage.setItem('long', position.coords.longitude)
      })
    }

    getLoc()

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

          this.props.setUser(data)
        }
      })
    } // end if
  } // end componentDidMount

  render() {
    return (
      <div className="row">
        <NavBar currentUser={this.props.currentUser} />
        <div className="m-4">
          <Switch>
            <Route exact path="/" render={() => this.props.currentUser.loggedIn ? <MainContainer logOut={this.props.logOut} /> : <SignUpLogIn />} />
            <Route path="/sandbox" component={SandboxContainer} />
          </Switch>
        </div>
        <TabbedBar />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: auth => {
      dispatch({ type: 'SET_USER', payload: auth })
    },
    logOut: () => {
      dispatch({ type: 'LOG_OUT' })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
