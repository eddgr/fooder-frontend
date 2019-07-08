import React from 'react'
import { connect } from 'react-redux'
import { ActionCableConsumer } from 'react-actioncable-provider'

import adapter from '../services/adapter'
import loadingScreen from '../components/Loading'

import moment from 'moment'

class ChatContainer extends React.Component {
  state = {
    currentMessage: '',
    loaded: false
  }

  componentDidMount() {
    if (!localStorage.token) {
      window.location.href = '/login'
    }
    this.showChat()
    this.props.inChat()
  }

  // HELPER FUNCTIONS
  showChat = () => {
    adapter.fetchVenue(this.props.currentUser.selectedVenue.id)
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
    adapter.sendMessage(this.props.currentUser.id, this.props.currentUser.selectedVenue.id, this.state.currentMessage)
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

  emptyMessages = () => {
    return (
      <div id="empty-likes" className="text-info">
        <i className="far fa-comment-dots display-4 mb-4"></i>
        Be the first to chat about this venue.
      </div>
    )
  }

  showCurrentMessages = () => {
    // checks to see if messages state exist
    if (this.props.messages.messages) {
      if (this.props.messages.messages.length !== 0) {
        const sortedMessages = this.props.messages.messages.sort((a, b) => {

          // check to see if message has a create_at date
          if (a.created_at) {
            return a.created_at.localeCompare(b.created_at)
          } else {
            // if it doesn't exist, return normal array
            return this.props.messages.messages
          }
        }) // end sortedMessages

        return sortedMessages.map(message => {
          return (
            <React.Fragment key={message.id}>
              {
                this.props.currentUser.username === message.username ?
                  <div className="text-right mr-0 ml-0 mt-2 mb-2">

                    <p className="text-left d-inline-block mb-0 flex p-2 pr-3 pl-3 bg-info rounded-lg text-white">
                      {message.content}
                    </p>
                    <p className="text-black-50 pr-1">
                      <small>
                        {moment(message.created_at).fromNow()}
                      </small>
                    </p>

                  </div>
                :
                  <div className="mr-0 ml-0 mt-2 mb-2">

                    <p className="mb-0 pl-1">
                      <strong>
                        {message.username}
                      </strong>
                    </p>

                    <div>
                      <p className="d-inline-block p-2 pr-3 pl-3 mb-0 bg-light rounded-lg text-dark">
                        {message.content}
                      </p>
                      <p className="pl-1 text-black-50">
                        <small>
                          {moment(message.created_at).fromNow()}
                        </small>
                      </p>
                    </div>

                  </div>
                }
            </React.Fragment>
          )
        })
      } else {
        return this.emptyMessages()
      }
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
            loadingScreen()
        }
        <form
          className="form-inline fixed-bottom"
          autoFocus={true}
          onSubmit={this.handleSubmitMessage}>
          <div className="input-group w-100">
            <input
              className="form-control rounded-0"
              onChange={this.handleMessageChange}
              value={this.state.currentMessage}
              type="text" />
            <button
              className="btn btn-info rounded-0"
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
