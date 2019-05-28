import * as React from 'react'

import Button from '@material-ui/core/Button'
import { History } from 'history'
import './styles.scss'

// tslint:disable-next-line:no-var-requires
const logo = require('../../../assets/png/DashLogo-Black@4x.png')

/**
 * Dash Header
 */

const Header: React.FunctionComponent<HeaderProps> = (props: HeaderProps) => {
  const handleGoUrl = (url) => () => props.history.push(url)
  return (
    <div className='header'>
      <div className='header-title'>
        <img src={logo} className='logo' />
        Dash
      </div>
      <Button className='account-button' variant='outlined' onClick={handleGoUrl('/account')}>
        Account
      </Button>
    </div>
  )
}

interface HeaderProps {
  history?: History
}

export default Header
