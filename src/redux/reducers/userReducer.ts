import jwt = require('jsonwebtoken')

const initialState = {
    loggedIn: false,
    logginIn: false,
}

if (localStorage.getItem('userToken')) {

    const decoded = jwt.decode(localStorage.getItem('userToken'), {json: true})

    if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem('userToken')
    } else {
        initialState.loggedIn = true
    }

}

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'loginRequest':
            return {
                logginIn: true,
                loggedIn: false,
            }
        case 'loginSuccess':
            return {
                logginIn: false,
                loggedIn: true,
            }
        case 'loginFailed':
            return {
                logginIn: false,
                loggedIn: false,
            }
        case 'fetchDetailSuccesss':
            return {
                ...state,
                email: action.email,
                fname: action.fname,
                sname: action.sname,
            }
        default:
            return state
    }
}

export default user
