const defaultState = {
  venues: [],
  loaded: false
}

const venueReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'ADD_VENUES':
      console.log('venueReducer state', state)
      return {
        ...state,
        venues: action.payload
      }
    case 'LIKE_VENUE':
      console.log('LIKE_VENUE action.venue', action.venue)

      const filteredLikedVenue = [...state.venues].filter(venue => {
        return venue.id !== action.venue.id
      })

      return {
        ...state,
        venues: filteredLikedVenue
      }
    case 'UNLIKE_VENUE':
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
        loaded: true
      }

    case 'LOG_OUT':
      return {
        ...state,
        liked: [],
        disliked: [],
        loaded: false
      }
    default:
      return state
  }
}

export default venueReducer
