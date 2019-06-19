import * as React from 'react'

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Sound from 'react-sound'

import { History } from 'history'
import { connect } from 'react-redux'
import { toggleAesthetic } from '../../redux/actions/memeActions'
import { logout } from '../../redux/actions/userActions'
import './styles.scss'

// tslint:disable-next-line:no-var-requires
const logo = require('../../../assets/png/DashLogo-Black@4x.png')
// tslint:disable-next-line:no-var-requires
const w95 = require('../../../assets/png/w95.png')
// tslint:disable-next-line:no-var-requires
const ss = require('../../../assets/png/ss-events.png')
// tslint:disable-next-line:no-var-requires
const startup = require('../../../assets/mp3/w95.mp3')

/**
 * Dash Header
 */

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  const [playing, setPlaying] = React.useState<string>(Sound.status.STOPPED)
  const handleLogout = () => {
    props.onLogout()
  }
  const handleVaporify = () => {
    if (props.vaporwave) {
      setPlaying(Sound.status.STOPPED)
    } else {
      setPlaying(Sound.status.PLAYING)
    }
    props.onVaporwave()
  }
  const handleStopPlaying = () => {
    setPlaying(Sound.status.STOPPED)
  }
  return (
    <div className={'header' + (props.vaporwave ? ' header-vaporwave' : '')}>
      <div className='header-title' style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <img src={props.vaporwave ? w95 : logo} className='logo' onClick={handleVaporify} />
        <span onClick={props.onHome} style={{ display: 'flex', alignItems: 'center' }}>
          Dash{props.vaporwave && '95'}
          {props.admin && <span style={{ fontWeight: 300, marginLeft: '0.5rem' }}> Admin</span>}
          {!props.admin && (
            <span style={{ fontWeight: 300, display: 'flex', alignItems: 'center', marginLeft: '0.5rem' }}>
              {' '}
              for{' '}
              <img
                src={ss}
                style={{
                  height: '40px',
                  objectFit: 'cover',
                  padding: '10px',
                  marginLeft: '0.5rem',
                  filter: 'invert(100%) brightness(50%)',
                }}
              />
            </span>
          )}
        </span>
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
      {props.onAdminTabChange && (
        <div style={{ width: '100vw', display: 'flex', justifyContent: 'center', position: 'fixed' }}>
          <div className='tabs-paper'>
            <Tabs
              value={props.currentAdminTab || 0}
              onChange={props.onAdminTabChange}
              indicatorColor='primary'
              textColor='primary'
              centered={true}
            >
              <Tab label='Customers' style={{ fontWeight: 'bold' }} />
              <Tab label='Menus' style={{ fontWeight: 'bold' }} />
            </Tabs>
          </div>
        </div>
      )}
      <div style={{ display: 'none' }}>
        <Sound url={startup} playStatus={playing} onFinishedPlaying={handleStopPlaying} />
      </div>
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

const mapStateToProps = (state) => {
  return {
    vaporwave: state.meme.vaporwave,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(logout())
    },
    onVaporwave: () => {
      dispatch(toggleAesthetic())
    },
  }
}

interface HeaderProps {
  history?: History
  onTabChange?: (event, newValue) => void
  onAdminTabChange?: (event, newValue) => void
  currentTab?: number
  currentAdminTab?: number
  admin?: boolean
  vaporwave: boolean
  onHome?: () => void
  onBack?: () => void
  onLogout: () => void
  onVaporwave: () => void
}

const ConnectedHeader = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)

export { ConnectedHeader as Header }
