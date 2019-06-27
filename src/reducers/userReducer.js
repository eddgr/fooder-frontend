const defaultState = {
  id: '',
  username: '',
  loggedIn: false,
  liked: [],
  disliked: [],
  filtered: false
}

const userReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'SET_USER':
      console.log('SET_USER action.payload', action.payload)
      return {
        id: action.payload.id,
        username: action.payload.username,
        loggedIn: true,
        liked: action.payload.show_likes,
        disliked: action.payload.show_dislikes
      }
    case 'LOG_OUT':
      return {
        id: '',
        username: '',
        loggedIn: false,
        liked: [],
        disliked: []
      }
    default:
      return state
  }
}

export default userReducer
