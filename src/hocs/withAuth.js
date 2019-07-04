import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logInAsync } from '../actions/loggedIn'

export default function withAuth(ComponentToBeWrapped) {
  class Something extends React.Component {
    componentDidMount() {
      try {
        // debugger
        this.props.logIn()
          .catch(e => {
            this.props.history.push("/login")
          })
      } catch (e) {
        if (e.message === "Please log in") {
          this.props.history.push("/login")
        }
      }
    }

    render() {
      return <ComponentToBeWrapped
        {...this.props}
        />
    }
  }

  const mapStateToProps = state => {

  }

  return withRouter(connect(null, {
    logIn: logInAsync
  })(Something))
}
