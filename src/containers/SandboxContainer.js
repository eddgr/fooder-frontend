import React from 'react'

import { connect } from 'react-redux'
import { ActionCableConsumer } from 'react-actioncable-provider'
import { Redirect } from 'react-router-dom'

const BACKEND_API = 'http://localhost:8000/api/v1'

class SandboxContainer extends React.Component {
  state = {
    currentMessage: '',
    loaded: false
  }

  componentDidMount() {
    if (this.props.currentUser.selectedVenue !== '') {
      this.showChat()
    } else {
      this.props.routeProps.history.push('/likes')
    }
  }

  // HELPER FUNCTIONS
  showChat = () => {
    return fetch(BACKEND_API + `/restaurants/${this.props.currentUser.selectedVenue}`)
      .then(r => r.json())
      .then(data => {
        this.props.loadMessages(data)
        this.setState({ loaded: true })
        this.scrollToBottom()
      })
  }

  scrollToBottom = () => {
    const chatBox = document.querySelector("#chat-box")
    chatBox.scrollTop = chatBox.scrollHeight
  }

  sendMessage = () => {
    return fetch('http://localhost:8000/api/v1/messages', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user_id: this.props.currentUser.id,
        restaurant_id: this.props.currentUser.selectedVenue,
        content: this.state.currentMessage
      })
    })
  }

  handleMessageChange = event => {
    this.setState({
      currentMessage: event.target.value
    })
  }

  handleSubmitMessage = event => {
    event.preventDefault()
    this.sendMessage()
    this.setState({
      currentMessage: ''
    })
  }

  handleReceived = data => {
    switch(data.type) {
      case 'SEND_MESSAGE':
        this.props.sendMessage(data.payload)
        this.scrollToBottom()
        break
      default:
        console.log(data)
    }
  }

  showCurrentMessages = () => {
    const sortedMessages = this.props.messages.messages.sort((a, b) => {

      // check to see if message has a create_at date
      if (a.created_at) {
        return a.created_at.localeCompare(b.created_at)
      } else {
        // if it doesn't exist, return normal array
        return this.props.messages.messages
      }
    })

    return sortedMessages.map(message => {
      return (<div key={message.id}>
        <strong>{message.username} {message.created_at}: </strong>
        {message.content}
      </div>)
    })
  }

  // end HELPER FUNCTIONS

  render() {
    console.log("Sandobx prps", this.props)
    return (
      <div className="m-4 row">
        SandboxContainer
        <div className="col-6">
          Current User ID: {this.props.currentUser.id}
        </div>

        <div className="col-6">
          <ActionCableConsumer
          channel={{ channel: "ChatThreadChannel", restaurant_id: this.props.currentUser.selectedVenue }}
          onReceived={data => this.handleReceived(data)} />
          <button onClick={() => this.handleLogOut()}>Log Out</button>
          <h2>Show message here</h2>

          {
            this.state.loaded ?

            <div id="chat-box" className="chat-box">
              {this.showCurrentMessages()}
            </div>
          :
            "Loading"
          }
          <h2>Send message here</h2>
          <form onSubmit={this.handleSubmitMessage}>
            <input
              onChange={this.handleMessageChange}
              value={this.state.currentMessage}
              type="text" />
            <input type="submit" />
          </form>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: message => {
      dispatch({type: 'SEND_MESSAGE', payload: message})
    },
    loadMessages: messages => {
      dispatch({type: 'LOAD_MESSAGES', payload: messages})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SandboxContainer);
