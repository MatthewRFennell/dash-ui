import * as React from 'react'

import Button from '@material-ui/core/Button'
import InputField from './InputField';
import { History } from 'history'

import './Login.scss'

interface RegisterProps {
    history: History
}

const Register : React.FunctionComponent<RegisterProps> = (props) => {

    const [email, setEmail] = React.useState("")
    const [fname, setFname] = React.useState("")
    const [sname, setSname] = React.useState("")
    const [company, setCompany] = React.useState("")

    const moveToLogin = () => {
        props.history.push("/login")
    }

    const submit = () => {
        props.history.push("/thanks")
    }

    return (
        <div>
            <div className="fixed-top-left">
                <Button variant="outlined"
                        color="primary" 
                        onClick={() => props.history.goBack()} 
                        className="chang-blue-font">
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
                    <h3 className="form-title">Create Account</h3>

                    <InputField label="First Name" change={setFname}/>
                    <InputField label="Second Name" change={setSname} />
                    <InputField label="Company Name" change={setCompany} />
                    <InputField label="Email" req={true} change={setEmail}/>

                    <h4 className="grey-light">A Password will be sent to you upon registration</h4>

                    <div className="align-right">
                        <Button variant="contained" color="primary" className="chang-blue-background" onClick={submit}>
                            Register
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register