import fetchProtected from '../api/protected'
import authHeader from '../api/authHeader'

export const login = (email, password) => {

    return (dispatch) => {

        dispatch(loginRequest())
        console.log("Dispatching login request")
        const body = {
            email,
            password
        }

        const stringy = JSON.stringify(body)

        return fetch('/api/login', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: stringy,
        }).then(response => response.json(), 
            error => console.log('An error occurred.', error))
          .then(res => {
              if(res.success){
                console.log("Dispatching login success")
                console.log(res.user)
                localStorage.setItem("userToken", res.token)
                dispatch(loginSuccess())
              } else {
                  console.log("Dispatching login failed")
                dispatch(loginFailed())
              }
          })

    }
}

export const loginRequest = () => {
    return {
        type : "loginRequest"
    }
}

export const loginSuccess = () => {
    return {
        type : "loginSuccess"
    }
}

export const loginFailed = () => {
    return {
        type : "loginFailed"
    }
}

export const logout = () => {

    return dispatch => {
        localStorage.removeItem("userToken")
        dispatch(loginFailed())
    }
}

export const fetchDetailSuccesss = (user) => {
    return {
        type: "fetchDetailSuccesss",
        email: user.email,
        fname: user.fname,
        sname: user.sname

    }
}

export const fetchDetails = () => {
    return dispatch => {
        fetchProtected('/api/me', authHeader(), null, 'GET', (res) => {
            if(res.success){
                dispatch(fetchDetailSuccesss(res.user))
            } else {
                dispatch(logout())
            }
        })
    }
}