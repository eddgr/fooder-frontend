const defaultState = {
  id: '',
  username: '',
  loggedIn: false
}

const userReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        id: action.payload.id,
        username: action.payload.username,
        loggedIn: true
      }
    case 'LOG_OUT':
      return {
        id: '',
        username: '',
        loggedIn: false
      }
    default:
      return state
  }
}

export default userReducer
