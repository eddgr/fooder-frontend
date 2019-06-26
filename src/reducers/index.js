import { combineReducers } from "redux"
import messageReducer from './messageReducer'
import venueReducer from './venueReducer'
import userReducer from './userReducer'

export default combineReducers({
  messages: messageReducer,
  venues: venueReducer,
  currentUser: userReducer
})
