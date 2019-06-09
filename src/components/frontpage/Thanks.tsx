import { Button } from '@material-ui/core'
import * as React from 'react'

import './Login.scss'

const Thanks = (props) => {
  const gotoLogin = () => {
    props.history.push('/login')
  }

  return (
    <div className='centered-panel'>
      <div className='login-panel'>
        <h1>Thanks for registering</h1>
        <h3 className='grey-light'>Please check you email for your confirmation and password</h3>
        <Button variant='outlined' color='primary' className='chang-blue-font' onClick={gotoLogin}>
          Login
        </Button>
      </div>
    </div>
  )
}

interface ThanksProps {
  history: History
}

export default Thanks
