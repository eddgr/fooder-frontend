import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import adapter from '../services/adapter'

class SignUpLogIn extends React.Component {
  state = {
    username: '',
    password: '',
    errorMsg: ''
  }

  componentDidMount() {
    // this.props.loaded()
    // if (localStorage.token && localStorage.user_id) {
    //   this.props.history.push('/')
    // }
    if (this.props.currentUser.loggedIn) {
      this.props.history.push('/')
    }
  }

  // HELPER FUNCTIONS
  handleLoginChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmitAuthForm = event => {
    event.preventDefault()
    switch(event.target.name) {
      case "signup":
        adapter.signUpReq(this.state.username.toLowerCase(), this.state.password)
          .then(data => {
            if (!data.error) {
              localStorage.setItem('token', data.token)
              localStorage.setItem('user_id', data.id)

              this.setState({
                username: '',
                password: '',
                errorMsg: ''
              })

              this.props.newUser(data)
              window.location.reload()
              // debugger
              // this.props.history.push('/')
            } else {
              this.setState({errorMsg: data.error})
              console.log(data.error)
            }
          })
        // end fetch
        break
      case "login":
        adapter.logInReq(this.state.username.toLowerCase(), this.state.password)
          .then(data => {
            if (!data.error) {
              localStorage.setItem('token', data.token)
              localStorage.setItem('user_id', data.id)

              this.props.setUser(data)
              this.props.history.push('/')

              this.setState({
                username: '',
                password: '',
                errorMsg: ''
              })
            } else {
              this.setState({errorMsg: data.error})
              console.log(data.error)
            }
          })
        // end fetch
        break
      default:
        console.log("boop")
    }
  }

  showForm = () => {
    return (
      <div id="login" className="col-md-4">
        <h1>fooder</h1>
        <p className="mb-4">Connect with food minded people.</p>

        {this.state.errorMsg !== '' && <div class="alert alert-danger" role="alert">
          {this.state.errorMsg}
        </div>}

        <form className="form-group mt-4">
          <input
            className="form-control pt-4 pb-4"
            name="username"
            value={this.state.username}
            onChange={this.handleLoginChange}
            placeholder="Username"
            type="text" />
          <input
            className="form-control mt-4 pt-4 pb-4"
            name="password"
            value={this.state.password}
            onChange={this.handleLoginChange}
            placeholder="Password"
            required
            type="password" />
          <br />
          <div className="row text-center">
            <div className="col-6">
              <button
                className="btn btn-info w-100"
                type="submit"
                name="signup"
                onClick={this.handleSubmitAuthForm}>Sign Up</button>
            </div>
            <div className="col-6">
              <button
                className="btn btn-outline-info w-100"
                type="submit"
                name="login"
                onClick={this.handleSubmitAuthForm}>Log In</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
  // end HELPER FUNCTIONS

  render() {
    console.log('SignUpLogIn props', this.props);
    return (
      this.showForm()
    )
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
    newUser: auth => {
      dispatch({ type: 'NEW_USER', payload: auth })
    },
    loaded: () => {
      dispatch({ type: 'LOADED' })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUpLogIn))
