import React from 'react'

import { connect } from 'react-redux'
import { ActionCableConsumer } from 'react-actioncable-provider'

const BACKEND_API = 'http://localhost:8000/api/v1'
const moment = require('moment')

class ChatContainer extends React.Component {
  state = {
    currentMessage: '',
    loaded: false
  }

  componentDidMount() {
    this.showChat()
  }

  // HELPER FUNCTIONS
  showChat = () => {
    return fetch(BACKEND_API + `/restaurants/${this.props.currentUser.selectedVenue.id}`)
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
        restaurant_id: this.props.currentUser.selectedVenue.id,
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
    // checks to see if messages state exist
    if (this.props.messages.messages) {
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
        return (
          <div key={message.id}>
            <strong>{message.username} {moment(message.created_at).fromNow()}: </strong>
            {message.content}
          </div>
        )
      })
    } else {
      // if not go back
      window.history.go(-1)
    }
  }

  handleGoBack = () => {
    this.props.routeProps.history.goBack(1)
    this.props.notInChat()
  }
  // end HELPER FUNCTIONS

  render() {
    console.log("ChatContainer props", this.props)
    return (
      <div>
        <ActionCableConsumer
        channel={{ channel: "ChatThreadChannel", restaurant_id: this.props.currentUser.selectedVenue.id }}
        onReceived={data => this.handleReceived(data)} />

        {
          this.state.loaded ?
            <div id="chat-box" className="chat-box overflow-auto">
              {this.showCurrentMessages()}
            </div>
          :
            "Loading"
        }
        <form
          className="form-inline fixed-bottom"
          onSubmit={this.handleSubmitMessage}>
          <div className="input-group w-100">
            <input
              className="form-control rounded-0"
              onChange={this.handleMessageChange}
              value={this.state.currentMessage}
              type="text" />
            <button
              className="btn btn-primary rounded-0"
              type="submit">
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>

        </form>
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
    },
    notInChat: () => {
      dispatch({type: 'NOT_IN_CHAT'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
