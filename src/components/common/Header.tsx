import * as React from 'react'

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'

import { History } from 'history'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/userActions'
import './styles.scss'

// tslint:disable-next-line:no-var-requires
const logo = require('../../../assets/png/DashLogo-Black@4x.png')

/**
 * Dash Header
 */

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  const handleLogout = () => {
    props.onLogout()
  }
  return (
    <div className='header'>
      <div className='header-title' onClick={props.onHome} style={{ cursor: 'pointer' }}>
        <img src={logo} className='logo' />
        Dash
      </div>
      {props.onTabChange && (
        <div style={{ width: '100vw', display: 'flex', justifyContent: 'center', position: 'fixed' }}>
          <div className='tabs-paper'>
            <Tabs
              value={props.currentTab || 0}
              onChange={props.onTabChange}
              indicatorColor='primary'
              textColor='primary'
              centered={true}
            >
              <Tab label='Overview' style={{ fontWeight: 'bold' }} />
              <Tab label='Attendees' style={{ fontWeight: 'bold' }} />
              <Tab label='Itinerary' style={{ fontWeight: 'bold' }} />
            </Tabs>
          </div>
        </div>
      )}
      <div>
        {props.onBack && (
          <Button className='account-button' color='primary' onClick={props.onBack}>
            Back
          </Button>
        )}
        <Button className='account-button' variant='outlined' color='primary' onClick={handleLogout}>
          Logout
        </Button>
      </div>
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
  onTabChange?: (event, newValue) => void
  currentTab?: number
  onHome?: () => void
  onBack?: () => void
  onLogout: () => void
}

const ConnectedHeader = connect(
  null,
  mapDispatchToProps,
)(Header)

export { ConnectedHeader as Header }
