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
import adapter from './services/adapter'
import withAuth from './hocs/withAuth'

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
    // if (!!localStorage.token) {
    //   adapter.initialLoad()
    //   .then(r => r.json())
    //   .then(data => {
    //     if (!!data.username) {
    //       localStorage.setItem("user_id", data.id)
    //
    //       this.props.setUser(data)
    //     }
    //   })
    //   this.setLoggedIn()
    // } // end if

    this.setState({
      loaded: true
    })
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

        <div className={!this.props.currentUser.loading ? "container mt-4 mb-4 pt-4 pb-4" : null}>
          <Switch>
            <Route exact path="/" render={() => this.props.currentUser.loggedIn  ? <VenueContainer /> : <SignUpLogIn setLoggedIn={this.setLoggedIn} />} />

            <Route path="/venues/:id" render={routeProps => <VenueDetails routeProps={routeProps} currentUser={this.props.currentUser} />} />

            <Route exact path="/likes" component={LikeContainer} />

            <Route exact path="/login" render={() => <SignUpLogIn setLoggedIn={this.setLoggedIn}/>} />

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
        { !this.props.currentUser.loading && this.mainApp() }

        {/*
          this.props.currentUser.loading && 'Loading...'
        */}
        {
          this.props.currentUser.loggedIn ?
            this.props.currentUser.loading && 'Loading...'
          :
            <SignUpLogIn setLoggedIn={this.setLoggedIn} />
        }
      </>
    )
  }
  // render() {
  //   console.log('App props', this.props)
  //   return (
  //     <>
  //     {
  //       !this.props.currentUser.loading ?
  //         this.mainApp()
  //       :
  //         !this.props.currentUser.loggedIn &&
  //           (<div className="m-4 p-4 text-center">
  //             <h1>fooder</h1>
  //             <SignUpLogIn setLoggedIn={this.setLoggedIn} />
  //           </div>)
  //     }
  //     </>
  //   )
  // }
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
      dispatch({ type: 'NOT_IN_CHAT' })
    },
    inChat: () => {
      dispatch({ type: 'IN_CHAT' })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(App))
