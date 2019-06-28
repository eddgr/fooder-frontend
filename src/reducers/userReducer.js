const defaultState = {
  id: '',
  username: '',
  loggedIn: false,
  liked: [],
  disliked: [],
  filtered: false,
  selectedVenue: {
    id: '',
    name: ''
  },
  inChat: false,
  location: {
    lat: '',
    long: ''
  }
}

const userReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'SET_USER':
      console.log('SET_USER action.payload', action.payload)
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        loggedIn: true,
        liked: action.payload.show_likes,
        disliked: action.payload.show_dislikes,
        location: {
          lat: action.payload.lat,
          long: action.payload.long
        }
      }
    case 'NEW_USER':
      console.log('NEW_USER action.payload', action.payload)
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        loggedIn: true,
        location: {
          lat: action.payload.lat,
          long: action.payload.long
        }
      }
    case 'LOG_OUT':
      return {
        id: '',
        username: '',
        loggedIn: false,
        liked: [],
        disliked: [],
        location: {
          lat: '',
          long: ''
        }
      }
    case 'LIKE_VENUE':
      return {
        ...state,
        liked: [...state.liked, {
          ...action.venue,
          favorites: [...action.venue.favorites, state.id]
        }]
      }
    case 'DISLIKE_VENUE':
      return {
        ...state,
        disliked: [...state.disliked, action.venue]
      }
    case 'SELECT_VENUE':
      return {
        ...state,
        selectedVenue: {
          id: action.venue.id,
          name: action.venue.name
        },
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
