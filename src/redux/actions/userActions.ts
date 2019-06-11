import authHeader from '../../api/authHeader'
import fetchProtected from '../../api/protected'

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(loginRequest())
    const body = {
      email: email.toLowerCase(),
      password,
    }
    const stringy = JSON.stringify(body)
    const url = DASH_API + '/login'
    return fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: stringy,
    })
      .then((response) => response.json(), (error) => console.log('An error occurred.', error))
      .then((res) => {
        if (res.success) {
          localStorage.setItem('userToken', res.token)
          console.log('Admin', res.user.type === 1)
          dispatch(loginSuccess(res.user.type === 1))
        } else {
          dispatch(loginFailed())
        }
      })
  }
}

export const loginRequest = () => {
  return {
    type: 'loginRequest',
  }
}

export const loginSuccess = (admin = false) => {
  return {
    type: 'loginSuccess',
    admin,
  }
}

export const loginFailed = (error = true) => {
  return {
    type: 'loginFailed',
    error,
  }
}

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('userToken')
    dispatch(loginFailed(false))
  }
}

export const fetchDetailSuccesss = (user) => {
  return {
    type: 'fetchDetailSuccesss',
    email: user.email,
    fname: user.fname,
    sname: user.sname,
  }
}

export const fetchDetails = () => {
  return (dispatch) => {
    const url = DASH_API + '/me'
    fetchProtected(url, null, null, 'GET', (res) => {
      if (res.success) {
        dispatch(fetchDetailSuccesss(res.user))
      } else {
        dispatch(logout())
      }
    })
  }
}
