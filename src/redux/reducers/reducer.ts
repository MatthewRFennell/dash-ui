import { combineReducers } from 'redux'
import events from './eventsReducer'
import user from './userReducer'
import form from './formReducer'

export default combineReducers({
    user,
    events,
    form
})
