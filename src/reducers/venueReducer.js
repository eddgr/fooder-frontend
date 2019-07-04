const defaultState = {
  venues: [],
  loading: true
}

const venueReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'ADD_VENUES':
      console.log('venueReducer state', state)
      return {
        venues: action.payload,
        loading: false
      }
    case 'LIKE_VENUE':
      console.log('LIKE_VENUE action.venue', action.venue)

      const filteredLikedVenue = [...state.venues].filter(venue => {
        return venue.id !== action.venue.id
      })

      return {
        ...state,
        venues: filteredLikedVenue,
        loading: false
      }
    case 'UNLIKE_VENUE':
      return {
        ...state,
        venues: [...state.venues, action.venue]
      }
    case 'UNDISLIKE_VENUE':
      return {
        ...state,
        venues: [...state.venues, action.venue]
      }
    case 'DISLIKE_VENUE':
      console.log('DISLIKE_VENUE action.venue', action.venue)

      const filteredDislikedVenue = [...state.venues].filter(venue => {
        return venue.id !== action.venue.id
      })

      return {
        ...state,
        venues: filteredDislikedVenue
      }

    case 'INITIAL_LOAD':
      return {
        ...state,
        loading: false
      }

    case 'LOG_OUT':
      return {
        ...state,
        liked: [],
        disliked: [],
        loading: false
      }
    default:
      return state
  }
}

export default venueReducer
