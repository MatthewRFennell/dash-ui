import * as React from 'react'
import { Button } from '@material-ui/core';
import history from '../../history'

import './Login.scss'

const Thanks = () => {

    const gotoLogin = () => {
        history.push('/login')
    }

    return (
        <div className="centered-panel">
            <div className="login-panel">
                <h1>Thanks for registering</h1>
                <h3 className="grey-light">Please check you email for your confirmation and password</h3>
                <Button variant="outlined"
                    color="primary"
                    className="chang-blue-font"
                    onClick={gotoLogin}>
                    Login
                </Button>
            </div>
        </div>
    )
}

export default Thanks;