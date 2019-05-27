import * as React from 'react'
import { logout } from '../../redux/actions/userActions'

import Paper from '@material-ui/core/Paper'

import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import './Banner.scss'

const Banner = (props) => {
  const handleLogout = () => {
    props.onLogout()
  }

  return (
    <Paper className='banner-paper'>
      <h1 className='logo'>Dash</h1>
      <div className='logo-container'>
        <Button
          variant='outlined'
          color='primary'
          className='chang-blue-font'
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </Paper>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(logout())
    },
  }
}

const connectedBanner = connect(
  null,
  mapDispatchToProps,
)(Banner)

export { connectedBanner as Banner }
