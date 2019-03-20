/* Main Imports */
import { History } from 'history'
import * as React from 'react'

/* Sass inports */
import './frontpage.scss'

/* Component Imports */
import Body from './Body'
import Cover from './Cover'

const FrontPage: React.FunctionComponent<FrontPageProps> = (props) => (
  <div className='frontpage-view'>
    <Cover />
    <Body />
  </div>
)

interface FrontPageProps {
  history: History
}

export default FrontPage
