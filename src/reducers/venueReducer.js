const defaultState = {
  venues: [],
  liked: [],
  disliked: []
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

      const venuesCopy = [...state.venues]
      const filteredVenue = venuesCopy.filter(venue => {
        return venue.id !== action.venue.id
      })

      // debugger
      return {
        ...state,
        venues: filteredVenue,
        liked: [...state.liked, action.venue]
      }
    case 'DISLIKE_VENUE':
      return state
    default:
      return state
  }
}

export default venueReducer
