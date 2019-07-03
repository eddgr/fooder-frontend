import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import adapter from '../services/adapter'

class SignUpLogIn extends React.Component {
  state = {
    username: '',
    password: ''
  }

  componentDidMount() {
    if (localStorage.token && localStorage.user_id) {
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
        adapter.signUpReq(this.state.username, this.state.password)
          .then(data => {
            if (!data.error) {
              localStorage.setItem('token', data.token)
              localStorage.setItem('user_id', data.id)

              this.setState({
                username: '',
                password: '',
              })

              this.props.newUser(data)
              this.props.setLoggedIn()
              this.props.history.push('/')
            } else {
              console.log(data.error)
            }
          })
        // end fetch
        break
      case "login":
        adapter.logInReq(this.state.username, this.state.password)
          .then(data => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('user_id', data.id)

            this.props.setUser(data)
            this.props.setLoggedIn()
            this.props.history.push('/')

            this.setState({
              username: '',
              password: '',
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
      <div id="login">
        <h1>fooder</h1>
        <p className="mb-4">Connect with food minded people.</p>
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
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: auth => {
      dispatch({ type: 'SET_USER', payload: auth })
    },
    newUser: auth => {
      dispatch({ type: 'NEW_USER', payload: auth })
    }
  }
}

export default connect(null, mapDispatchToProps)(withRouter(SignUpLogIn))
