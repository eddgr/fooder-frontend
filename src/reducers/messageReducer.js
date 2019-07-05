const defaultState = {
  messages: []
}

const messageReducer = (state=defaultState, action) => {
  switch(action.type) {
    case 'LOAD_MESSAGES':
      console.log('LOAD_MESSAGES action', action.payload)
      console.log('messageReducer state from LOAD_MESSAGES', state)
      return {
        messages: action.payload.messages
      }
    case 'SEND_MESSAGE':
      console.log('SEND_MESSAGE action', action)
      console.log('messageReducer state', state)
      return {
        messages: [...state.messages, action.payload]
      }
      // return state
    default:
      return state
  }
}

export default messageReducer
