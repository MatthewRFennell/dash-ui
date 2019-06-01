import { combineReducers } from 'redux'
import user from './userReducer'
import events from './eventsReducer';

export default combineReducers({
    user,
    events
})
