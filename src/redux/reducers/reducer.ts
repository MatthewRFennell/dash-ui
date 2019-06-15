import { combineReducers } from 'redux'
import events from './eventsReducer'
import form from './formReducer'
import meme from './memeReducer'
import user from './userReducer'

export default combineReducers({
  user,
  events,
  form,
  meme,
})
