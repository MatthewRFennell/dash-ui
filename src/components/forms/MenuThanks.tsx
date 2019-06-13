import { Button } from '@material-ui/core'
import * as React from 'react'

import '../frontpage/Login.scss'

const MenuThanks = (props) => {

  return (
    <div className='centered-panel'>
      <div className='login-panel'>
        <h1>Your menu has been created</h1>
        <h3 className='grey-light'>Please check the event page for a link to distribute this menu</h3>
        <Button variant='outlined' color='primary' className='chang-blue-font' onClick={props.onBack}>
          Back
        </Button>
      </div>
    </div>
  )
}

export default MenuThanks
