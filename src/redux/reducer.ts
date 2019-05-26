import { combineReducers } from "redux"
import jwt = require('jsonwebtoken');

let initialState = {
    loggedIn: false,
    logginIn: false
}

if (localStorage.getItem("userToken")){

    const decoded = jwt.decode(localStorage.getItem("userToken"), {json: true})

    console.log(decoded.exp)
    console.log(Date.now() / 1000)

    if(decoded.exp < Date.now() / 1000){
        console.log("Removing token")
        localStorage.removeItem("userToken")
    } else {
        console.log("Setting logged in to true")
        initialState.loggedIn = true
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
                loggedIn: true
            }
        case 'loginFailed':
            return {
                logginIn: false,
                loggedIn: false
            }
        case 'fetchDetailSuccesss':
            return {
                ...state,
                email: action.email,
                fname: action.fname,
                sname: action.sname
            }
        default:
            return state
    }
}

export const reducer = combineReducers({
    user
})