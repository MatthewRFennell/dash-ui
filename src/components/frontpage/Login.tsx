import * as React from 'react'
import { connect } from 'react-redux'

import { Redirect } from 'react-router-dom'
import { login } from '../../redux/actions/userActions'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Link from '@material-ui/core/Link'
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import './Login.scss'

// tslint:disable-next-line:no-var-requires
const loginImage = require('../../../assets/png/login.jpg')

const Login: React.FunctionComponent<LoginProps> = (props) => {
  const [visible, setVisibility] = React.useState<boolean>(false)
  const [password, setPassword] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  const [error, setError] = React.useState<boolean>(false)

  const handlePasswordChange: ChangeEventFunc = (e) => {
    setPassword(e.target.value)
  }

  const handleEmailChange: ChangeEventFunc = (e) => {
    setEmail(e.target.value)
  }

  const submit = (): void => {
    props.onLogin(email, password)
  }

  const handleKeyPress: KeyEventFunc = (e) => {
    if (e.keyCode === 13) {
      submit()
    }
  }

  const handleToggleVisibility = () => setVisibility(!visible)

  return props.loggedIn ? (
    <Redirect to='/' />
  ) : (
    <div className='login-view'>
      <img src={loginImage} className='left-panel' />
      <div className='right-panel'>
        <div className='login-panel'>
          <h3 className='large-heading'>Dash</h3>
          <h2 className='slogan'>Centralized Event Management</h2>
          <div>
            <TextField
              id='email'
              label='Email'
              margin='normal'
              variant='outlined'
              error={props.error}
              type='text'
              required={true}
              onChange={handleEmailChange}
              className='margin-end small-box'
              style={{
                marginTop: '30px',
              }}
            />
          </div>
          <div>
            <TextField
              id='password'
              variant='outlined'
              type={visible ? 'text' : 'password'}
              label='Password'
              error={props.error}
              className='small-box'
              onChange={handlePasswordChange}
              onKeyDown={handleKeyPress}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton aria-label='Toggle password visibility' onClick={handleToggleVisibility}>
                      {visible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              margin='normal'
              style={{
                marginBottom: '30px',
              }}
            />
          </div>
          <div className='margin-bottom'>
            {props.waiting ? (
              <CircularProgress />
            ) : (
              <Button
                variant='contained'
                color='primary'
                className='chang-blue-background'
                onClick={submit}
                size='large'
                style={{
                  fontWeight: 'bold',
                }}
              >
                Login
              </Button>
            )}
          </div>
          <Link href='/register'>Don't have an account? Create one here</Link>
        </div>
      </div>
    </div>
  )
}

interface LoginProps {
  waiting: boolean
  loggedIn: boolean
  error: boolean
  onLogin: (email: string, password: string) => void
}

const mapStateToProps = (state) => {
  return {
    waiting: state.user.logginIn,
    loggedIn: state.user.loggedIn,
    error: state.user.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (email, password) => {
      dispatch(login(email, password))
    },
  }
}

const connectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)

export { connectedLogin as Login }
