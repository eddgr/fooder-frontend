import React from 'react'
import { connect } from 'react-redux'

import adapter from '../services/adapter'

class SignUpLogIn extends React.Component {
  state = {
    username: '',
    password: ''
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

            this.setState({
              username: '',
              password: '',
            })
            this.props.setUser(data)
            this.props.setLoggedIn()
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
      <form className="form-group">
        <input
          className="form-control"
          name="username"
          value={this.state.username}
          onChange={this.handleLoginChange}
          placeholder="username"
          type="text" />
        <input
          className="form-control"
          name="password"
          value={this.state.password}
          onChange={this.handleLoginChange}
          placeholder="password"
          required
          type="password" />
        <br />
        <div className="row text-center">
          <div className="col-6">
            <button
              className="btn btn-primary w-100"
              type="submit"
              name="signup"
              onClick={this.handleSubmitAuthForm}>Sign Up</button>
          </div>
          <div className="col-6">
            <button
              className="btn btn-primary w-100"
              type="submit"
              name="login"
              onClick={this.handleSubmitAuthForm}>Log In</button>
          </div>
        </div>
      </form>
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

export default connect(null, mapDispatchToProps)(SignUpLogIn)
