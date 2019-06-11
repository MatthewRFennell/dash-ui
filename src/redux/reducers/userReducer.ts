import jwt = require('jsonwebtoken')

const initialState = {
  loggedIn: false,
  logginIn: false,
  admin: false,
  error: false,
}

if (localStorage.getItem('userToken')) {
  const decoded = jwt.decode(localStorage.getItem('userToken'), { json: true })
  if (decoded && decoded.exp > Date.now() / 1000) {
    initialState.loggedIn = true
    initialState.admin = decoded.type === 1
  } else {
    localStorage.removeItem('userToken')
  }
}

const user = (state = initialState, action) => {
  console.log(state, action)
  switch (action.type) {
    case 'loginRequest':
      return {
        ...state,
        logginIn: true,
        loggedIn: false,
      }
    case 'loginSuccess':
      return {
        ...state,
        logginIn: false,
        loggedIn: true,
        error: false,
        admin: action.admin,
      }
    case 'loginFailed':
      return {
        logginIn: false,
        loggedIn: false,
        admin: false,
        error: action.error,

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
