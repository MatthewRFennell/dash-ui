import * as React from 'react'

import { History } from 'history'
import { Header } from '../common/Header'

import CustomerView from './customer/CustomerView'
import './styles.scss'

const Dashboard: React.FunctionComponent<DashboardProps> = (props: DashboardProps) => {
  return (
    <div>
      <Header history={props.history} />
      <CustomerView history={props.history} />
    </div>
  )
}

interface DashboardProps {
  history: History
}

export default Dashboard
