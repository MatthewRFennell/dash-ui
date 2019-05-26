import * as React from 'react'

import Button from '@material-ui/core/Button'

import {login} from '../../redux/actions'
import { Redirect } from 'react-router-dom'

import './Login.scss'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Link, CircularProgress } from '@material-ui/core';

import { connect } from 'react-redux';

interface LoginProps {
    waiting: boolean,
    loggedIn: boolean
    onLogin: (email: string, password: string) => void
}

const Login: React.FunctionComponent<LoginProps> = (props) => {

    const [visible, setVisiblity] = React.useState(false)
    const [password, setPassword] = React.useState("")
    const [email, setEmail] = React.useState("")

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const submit = () => {
        props.onLogin(email, password)
    }

    const handleKeyPress = (e) => {
        if(e.keyCode == 13) {
            submit()
        }
    }

    console.log("At login we are", props.loggedIn)
    console.log("Waiting", props.waiting)

    return (
        props.loggedIn ? 
        <Redirect to="/home"/>
            :
        <div>
            <div className="centered-panel">
                <div className="login-panel">
                    <h3 className="large-heading">Dash</h3>
                    <h2 className="slogan">Centralized Event Management</h2>
                    <TextField
                        id="email"
                        label="Email"
                        margin="normal"
                        variant="outlined"
                        type="text"
                        required={true}
                        onChange={handleEmailChange}
                        className="margin-end small-box"
                    />
                    <TextField
                        id="password"
                        variant="outlined"
                        type={visible ? 'text' : 'password'}
                        label="Password"
                        className="small-box"
                        onChange={handlePasswordChange}
                        onKeyDown={handleKeyPress}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={() => setVisiblity(!visible)}
                                    >
                                        {visible ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <div className="margin-bottom">
                        {props.waiting ? <CircularProgress /> : <Button variant="contained" color="primary" className="chang-blue-background" onClick={submit}>
                            Login
                            </Button>}
                    </div>
                    <Link href="/register">
                    Don't have an account?
                    </Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        waiting : state.user.logginIn,
        loggedIn: state.user.loggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => {
            dispatch(login(email, password))
        }
    }
}

const connectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)

export {connectedLogin as Login};