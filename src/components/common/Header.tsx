import * as React from 'react'

import Paper from '@material-ui/core/Paper'
import icon from '../../../assets/SVG/DashLogo-Black.svg'
import './Header.scss'

/**
 * Dash Header
 */

const Header: React.FunctionComponent<HeaderProps> = () => {
  return (
    <div className='header'>
      <img src={icon} />
      <div className='header-title'>Dash</div>
    </div>
  )
}

interface HeaderProps {
  history?: History
}

export default Header
