import * as React from 'react'

import Button from '@material-ui/core/Button'
import { History } from 'history'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/userActions'
import './styles.scss'

// tslint:disable-next-line:no-var-requires
const logo = require('../../../assets/png/DashLogo-Black@4x.png')

/**
 * Dash Header
 */

const Header: React.FunctionComponent<HeaderProps> = (props: HeaderProps) => {
  const handleLogout = () => {
    props.onLogout()
  }
  return (
    <div className='header'>
      <div className='header-title'>
        <img src={logo} className='logo' />
        Dash
      </div>
      <Button className='account-button' variant='outlined' color='primary' onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(logout())
    },
  }
}

interface HeaderProps {
  history?: History
  onLogout: () => void
}

const connectedHeader = connect(
  null,
  mapDispatchToProps,
)(Header)

export { connectedHeader as Header }
