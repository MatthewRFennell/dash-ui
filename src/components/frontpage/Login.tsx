import * as React from 'react'

import Button from '@material-ui/core/Button'
import { History } from 'history'

import './Login.scss'
import InputField from './InputField';

interface LoginProps {
    history: History
}

const Login: React.FunctionComponent<LoginProps> = (props) => {

    const moveToRegister = () => {
        props.history.push("/register")
    }

    return (
        <div>
            <div className="fixed-top-left">
                <Button variant="outlined" color="primary" onClick={() => props.history.goBack()} className="chang-blue-font">
                    Back
                </Button>
            </div>
            <div className="fixed-top-right">
                <Button variant="outlined" color="primary" onClick={moveToRegister} className="chang-blue-font">
                    Register
                </Button>
            </div>
            <div className="centered-panel">
                <div className="login-panel">
                    <h3 className="align-left">Sign In</h3>
                    <InputField label="Email" req={true}/>
                    <InputField label="Password" type="password" req={true}/>
                    <div className="align-right">
                        <Button variant="contained" color="primary" className="chang-blue-background">
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login