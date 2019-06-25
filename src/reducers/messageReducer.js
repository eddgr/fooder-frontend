const defaultState = {
  messages: []
}

const messageReducer = (state=defaultState, action) => {
  switch(action.type) {
    case 'SEND_MESSAGE':
      console.log('SEND_MESSAGE action', action)
      console.log('messageReducer state', state)
      const messageObj = {
        id: action.payload.message.id,
        username: action.payload.user.name,
        content: action.payload.message.content
      }
      return {messages: [...state.messages, messageObj]}
      // return state
    default:
      return state
  }
}

export default messageReducer
