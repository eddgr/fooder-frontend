const defaultState = {
  id: '',
  username: '',
  loggedIn: false,
  liked: [],
  disliked: [],
  filtered: false,
  selectedVenue: '',
  inChat: false
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
    case 'LIKE_VENUE':
      return {
        ...state,
        liked: [...state.liked, action.venue]
      }
    case 'DISLIKE_VENUE':
      return {
        ...state,
        disliked: [...state.disliked, action.venue]
      }
    case 'SELECT_VENUE':
      return {
        ...state,
        selectedVenue: action.venueId,
        inChat: true
      }
    case 'NOT_IN_CHAT':
      return {
        ...state,
        inChat: false
      }
    default:
      return state
  }
}

export default userReducer
