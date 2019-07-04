import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

// Containers and Components
import NavBar from './components/NavBar'
import VenueContainer from './containers/VenueContainer'
import LikeContainer from './containers/LikeContainer'
import ChatContainer from './containers/ChatContainer'
import ProfileContainer from './containers/ProfileContainer'
import SignUpLogIn from './components/SignUpLogIn'
import VenueDetails from './components/VenueDetails'
import TabbedBar from './components/TabbedBar'

// HOCs
import withAuth from './hocs/withAuth'

class App extends React.Component {
  componentDidMount() {
    let getLoc = () => {
      navigator.geolocation.getCurrentPosition(position => {
        localStorage.setItem('lat', position.coords.latitude)
        localStorage.setItem('long', position.coords.longitude)
      })
    }

    getLoc()
  } // end componentDidMount

  // HELPER FUNCTIONS

  mainApp = () => {
    return (
      <>
        {
          this.props.currentUser.loggedIn ?
            <NavBar
              notInChat={this.props.notInChat}
              inChat={this.props.inChat}
              currentUser={this.props.currentUser} />
          :
            null
        }

        <div className={this.props.currentUser.loggedIn ? "container mt-4 mb-4 pt-4 pb-4" : null}>
          <Switch>
            <Route exact path="/" component={VenueContainer} />

            <Route path="/venues/:id" render={routeProps => <VenueDetails routeProps={routeProps} currentUser={this.props.currentUser} />} />

            <Route exact path="/likes" component={LikeContainer} />

            <Route exact path="/login" component={SignUpLogIn} />

            <Route exact path="/profile" render={() => <ProfileContainer logOut={this.props.logOut} />} />

            <Route exact path="/chats" render={routeProps => <ChatContainer routeProps={routeProps} inChat={this.props.inChat} />} />
          </Switch>
        </div>

        {
          this.props.currentUser.inChat || !this.props.currentUser.loggedIn ?
            null
          :
            <TabbedBar notInChat={this.props.notInChat} />
        }
      </>
    )
  }
  // end HELPER FUNCTIONS

  render() {
    console.log('App props', this.props)
    return (
      <>
        {this.props.currentUser.loading ? <SignUpLogIn /> : this.mainApp()}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
    // loadingState: state.loading
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
      dispatch({ type: 'NOT_IN_CHAT' })
    },
    inChat: () => {
      dispatch({ type: 'IN_CHAT' })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(App))
