import { combineReducers } from 'redux'
import events from './eventsReducer'
import user from './userReducer'

export default combineReducers({
    user,
    events,
})
