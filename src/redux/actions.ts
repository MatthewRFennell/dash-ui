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
                dispatch(loginSuccess(res.user))
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

export const loginSuccess = (user) => {
    return {
        type : "loginSuccess",
        user
    }
}

export const loginFailed = () => {
    return {
        type : "loginFailed"
    }
}

export const logout = () => {
    return {
        type: 'logout'
    }
}