import { combineReducers } from 'redux'
import events from './eventsReducer'
import form from './formReducer'
import user from './userReducer'

export default combineReducers({
    user,
    events,
    form,
})
