import * as React from 'react'

import Button from '@material-ui/core/Button'
import { History } from 'history'

import './Login.scss'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Link } from '@material-ui/core';

interface LoginProps {
    history: History
}

const Login: React.FunctionComponent<LoginProps> = () => {

    const [visible, setVisiblity] = React.useState(false)
    const [password, setPassword] = React.useState("")

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    return (
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
                        className="margin-end small-box"
                    />
                    <TextField
                        id="password"
                        variant="outlined"
                        type={visible ? 'text' : 'password'}
                        label="Password"
                        className="small-box"
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
                        <Button variant="contained" color="primary" className="chang-blue-background">
                            Login
                        </Button>
                    </div>
                    <Link href="/register">
                    Don't have an account?
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login