const defaultState = {
  id: '',
  username: '',
  loggedIn: false,
  loading: false,
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
    case 'LOADING':
      return {
        ...state,
        loading: true
      }
    case 'SET_USER':
      console.log('SET_USER action.payload', action.payload)
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        loading: false,
        loggedIn: true,
        liked: action.payload.show_likes.sort((a,b) => {
          return b.updated_at.localeCompare(a.updated_at)
        }),
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
        loading: false,
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
    case 'UNLIKE_VENUE':
      console.log('UNLIKE_VENUE', action.payload)
      const unlikedVenue = [...state.liked].filter(venue => venue.id !== parseInt(action.payload.restaurant_id))
      // const unlikedVenue = [...state.liked].find(venue => venue.id === parseInt(action.payload.restaurant_id))
      return {
        ...state,
        liked: unlikedVenue
      }
    case 'UNDISLIKE_VENUE':
      console.log('UNDISLIKE_VENUE', action.payload)
      const undislikedVenue = [...state.disliked].filter(venue => venue.id !== parseInt(action.payload.restaurant_id))
      // const unlikedVenue = [...state.liked].find(venue => venue.id === parseInt(action.payload.restaurant_id))
      return {
        ...state,
        disliked: undislikedVenue
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
    case 'IN_CHAT':
      return {
        ...state,
        inChat: true
      }
    case 'NOT_IN_CHAT':
      return {
        ...state,
        inChat: false
      }
    case 'SEND_MESSAGE':
      console.log('userReducer UPDATE_MESSAGES action', action.payload)
      // filter out liked venue
      const filterSelectedRestaurant = state.liked.filter(rest => rest.id === action.payload.restaurant_id)[0]

      // then add action.payload to liked.messages array
      filterSelectedRestaurant.messages.push(action.payload)

      // find index of filtered rest
      const stateLikedDuplicate = [...state.liked]
      // splice to add it back in
      stateLikedDuplicate.splice(stateLikedDuplicate.findIndex(rest => rest === filterSelectedRestaurant), 1, filterSelectedRestaurant)

      const sortLiked = stateLikedDuplicate.sort((a,b) => {
        return b.updated_at.localeCompare(a.updated_at)
      })

      return {
        ...state,
        liked: sortLiked
      }
    default:
      return state
  }
}

export default userReducer
