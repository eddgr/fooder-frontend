const defaultState = {
  venues: [],
  liked: [],
  disliked: []
}

const venueReducer = (state=defaultState, action) => {
  let venuesCopy
  let filteredVenue
  
  switch (action.type) {
    case 'ADD_VENUES':
      console.log('venueReducer state', state)
      return {
        ...state,
        venues: action.payload
      }
    case 'LIKE_VENUE':
      console.log('LIKE_VENUE action.venue', action.venue)

      venuesCopy = [...state.venues]
      filteredVenue = venuesCopy.filter(venue => {
        return venue.id !== action.venue.id
      })

      return {
        ...state,
        venues: filteredVenue,
        liked: [...state.liked, action.venue]
      }
    case 'DISLIKE_VENUE':
      console.log('DISLIKE_VENUE action.venue', action.venue)

      venuesCopy = [...state.venues]
      filteredVenue = venuesCopy.filter(venue => {
        return venue.id !== action.venue.id
      })

      return {
        ...state,
        venues: filteredVenue,
        disliked: [...state.disliked, action.venue]
      }
    default:
      return state
  }
}

export default venueReducer
