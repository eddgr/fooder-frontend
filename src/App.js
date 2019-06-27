import React from 'react';
import NavBar from './components/NavBar'
import MainContainer from './containers/MainContainer'
import LikeContainer from './containers/LikeContainer'
import ChatContainer from './containers/ChatContainer'
import SignUpLogIn from './components/SignUpLogIn'
import TabbedBar from './components/TabbedBar'
// import Error from './components/Error'


import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

const AUTH_API = 'http://localhost:8000'

class App extends React.Component {
  state = {
    loaded: false,
    loggedIn: false
  }

  setLoggedIn = () => {
    this.setState({
      loggedIn: true,
      loaded: true
    })
  }

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
        this.setState({
          loaded: true,
          loggedIn: true
        })
      })
    } // end if
  } // end componentDidMount

  render() {
    return (
      <div>
      {
        this.state.loaded ?
          <>
            <NavBar
              notInChat={this.props.notInChat}
              currentUser={this.props.currentUser} />

            <div className="container mt-4 mb-4 pt-4 pb-4">
              <Switch>
                <Route exact path="/" render={() => this.props.currentUser.loggedIn  ? <MainContainer logOut={this.props.logOut} /> : <SignUpLogIn setLoggedIn={this.setLoggedIn} />} />
                <Route path="/likes" component={LikeContainer} />
                <Route path="/sandbox" render={routeProps => <ChatContainer routeProps={routeProps} />} />
              </Switch>
            </div>

            {
              this.props.currentUser.inChat ?
                null
              :
              <TabbedBar />
            }
          </>
        :
          this.state.loggedIn ?
            "Loading"
          :
            <div className="m-4 p-4 text-center">
              <h1>fulfilld</h1>
              <SignUpLogIn setLoggedIn={this.setLoggedIn} />
            </div>
      }
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
    },
    notInChat: () => {
      dispatch({type: 'NOT_IN_CHAT'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
