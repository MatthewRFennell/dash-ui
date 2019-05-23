import * as React from 'react'
import { Button } from '@material-ui/core';

import './Login.scss'

const Thanks = () => {
    return (
        <div className="centered-panel">
            <div className="login-panel">
                <h1>Thanks for registering</h1>
                <h3 className="grey-light">Please check you email for your confirmation and password</h3>
                <Button variant="outlined"
                    color="primary"
                    className="chang-blue-font">
                    Okay
                </Button>
            </div>
        </div>
    )
}

export default Thanks;