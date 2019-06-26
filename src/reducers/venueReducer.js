const defaultState = {
  venues: []
}

const venueReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'ADD_VENUES':
      return { venues: action.payload }
    default:
      return state
  }
}

export default venueReducer
