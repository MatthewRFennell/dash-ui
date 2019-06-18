import * as React from 'react'
import { connect } from 'react-redux'

import { Redirect } from 'react-router-dom'
import { login } from '../../redux/actions/userActions'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import LinearProgress from '@material-ui/core/LinearProgress'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import './Login.scss'

// tslint:disable-next-line:no-var-requires
const loginImage = require('../../../assets/png/login.jpg')
// tslint:disable-next-line:no-var-requires
const logo = require('../../../assets/png/DashLogo-White@4x.png')

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
  ) : props.vaporwave ? (
    <div
      style={{
        background: '#008080',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper>
        <div className='window-title-bar'>Enter Dash Password</div>
        <div style={{ margin: '30px' }}>
          <div>
            <Typography>Type a user name and password to log on to Dash.</Typography>
            <Typography>
              Tip: if you don't have an account, you can <Link href='/register'>create one here</Link>.
            </Typography>
            <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center' }}>
              <Typography component='span'>User name</Typography>
              <TextField
                style={{ marginLeft: '15px' }}
                variant='outlined'
                type='text'
                required={true}
                error={props.error}
                onChange={handleEmailChange}
              />
            </div>
            <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center' }}>
              <Typography component='span'>Pasword</Typography>
              <TextField
                style={{ marginLeft: '15px' }}
                variant='outlined'
                type={visible ? 'text' : 'password'}
                required={true}
                error={props.error}
                onChange={handlePasswordChange}
                onKeyDown={handleKeyPress}
              />
            </div>
          </div>
          <Button variant='outlined' onClick={submit} color='primary' style={{ marginTop: '30px' }}>
            Login
          </Button>
        </div>
      </Paper>
    </div>
  ) : (
    <div className='login-view'>
      <div className='left-panel'>
        <img src={loginImage} className='bkg' />
        <img src={logo} className='logo' />
      </div>
      <div className='right-panel'>
        {props.waiting && <LinearProgress style={{ position: 'fixed', width: '50vw', top: '0', left: '50vw' }} />}
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
            <Button
              variant='outlined'
              disabled={props.waiting}
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
  vaporwave: boolean
  onLogin: (email: string, password: string) => void
}

const mapStateToProps = (state) => {
  return {
    waiting: state.user.logginIn,
    loggedIn: state.user.loggedIn,
    error: state.user.error,
    vaporwave: state.meme.vaporwave,
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
