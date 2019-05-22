import * as React from 'react'

import Button from '@material-ui/core/Button'
import InputField from './InputField';
import { History } from 'history'

import './Login.scss'

interface RegisterProps {
    history: History
}

const Register : React.FunctionComponent<RegisterProps> = (props) => {

    const moveToLogin = () => {
        props.history.push("/login")
    }

    return (
        <div>
            <div className="fixed-top-left">
                <Button variant="outlined" color="primary" onClick={() => props.history.goBack()} className="chang-blue-font">
                    Back
                </Button>
            </div>
            <div className="fixed-top-right">
                <Button variant="outlined" color="primary" onClick={moveToLogin} className="chang-blue-font">
                    Login
                </Button>
            </div>
            <div className="centered-panel">
                <div className="login-panel">
                    <h3 className="align-left">Create Account</h3>

                    <InputField label="First Name"/>
                    <InputField label="Second Name"/>
                    <InputField label="Email" req={true}/>
                    <InputField label="Password" type="password" req={true}/>

                    <div className="align-right">
                        <Button variant="contained" color="primary" className="chang-blue-background">
                            Register
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register