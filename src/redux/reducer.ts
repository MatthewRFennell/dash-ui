import { combineReducers } from "redux"

const initialState = {
    user: {
        loggedIn: false
    }
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'loginRequest':
            return {
                logginIn: true,
                loggedIn: false
            }
        case 'loginSuccess':
            return {
                logginIn: false,
                loggedIn: true,
                firstName: action.user.fname,
                secondName: action.user.fname,
                email: action.user.email
            }
        case 'loginFailed':
            return {
                logginIn: false,
                loggedIn: true
            }
        case 'logout':
            return {
                loggingIn: false,
                loggedIn: false
            }
        default:
            return state
    }
}

export const reducer = combineReducers({
    user
})