import { combineReducers } from "redux"
import messageReducer from './messageReducer'
import venueReducer from './venueReducer'

export default combineReducers({
  messages: messageReducer,
  venues: venueReducer
})
