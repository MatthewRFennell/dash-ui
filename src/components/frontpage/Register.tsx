import * as React from 'react'

import Button from '@material-ui/core/Button'
import * as EmailValidator from 'email-validator'
import { History } from 'history'
import InputField from './InputField'

import { CircularProgress } from '@material-ui/core'
import './Login.scss'
import Thanks from './Thanks'

interface RegisterProps {
  history: History
}

const Register: React.FunctionComponent<RegisterProps> = (props) => {
  const [email, setEmail] = React.useState('')
  const [fname, setFname] = React.useState('')
  const [sname, setSname] = React.useState('')
  const [password, setPassword] = React.useState('')

  const [finished, setFinished] = React.useState(false)
  const [waiting, setWaiting] = React.useState(false)
  const [errors, setErrors] = React.useState({
    email: '',
    fname: '',
    sname: '',
    password: '',
  })

  const moveToLogin = () => {
    props.history.push('/login')
  }

  const submit = () => {
    let ret = false
    const newErrors = {
      email: '',
      fname: '',
      sname: '',
      password: '',
    }
    if (email === '') {
      newErrors.email = 'Email is required'
      ret = true
    } else if (!EmailValidator.validate(email)) {
      newErrors.email = 'Email not valid'
      ret = true
    }
    if (fname === '') {
      newErrors.fname = 'First name is required'
      ret = true
    }
    if (sname === '') {
      newErrors.sname = 'Second name is required'
      ret = true
    }
    if (password === '') {
      newErrors.password = 'Password isrequired'
      ret = true
    }
    if (ret) {
      setErrors(newErrors)
      return
    }

    setWaiting(true)
    const body = {
      email: email.toLowerCase(),
      fname: fname.toLowerCase(),
      sname: sname.toLowerCase(),
      password,
    }
    const url = DASH_API + '/register'
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setWaiting(false)
        // console.log(res)
        if (res.success) {
          setFinished(true)
        } else {
          setErrors({
            email: res.message,
            fname: '',
            sname: '',
            password: '',
          })
        }
      })
  }

  return finished ? (
    <Thanks history={props.history} />
  ) : (
    <div>
      <div className='fixed-top-left'>
        <Button variant='outlined' color='primary' onClick={props.history.goBack} className='chang-blue-font'>
          Back
        </Button>
      </div>
      <div className='fixed-top-right'>
        <Button variant='outlined' color='primary' onClick={moveToLogin} className='chang-blue-font'>
          Login
        </Button>
      </div>
      <div className='centered-panel'>
        <div className='login-panel'>
          <h3 className='form-title'>Create Account</h3>

          <InputField label='First Name' change={setFname} errMsg={errors.fname} />
          <InputField label='Second Name' change={setSname} errMsg={errors.sname} />
          <InputField label='Email' req={true} change={setEmail} type='email' errMsg={errors.email} />
          <InputField label='Password' change={setPassword} req={true} type='password' errMsg={errors.password} />

          <div className='align-right'>
            {waiting ? (
              <CircularProgress />
            ) : (
              <Button variant='contained' color='primary' className='chang-blue-background' onClick={submit}>
                Register
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
