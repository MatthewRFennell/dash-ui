import * as React from 'react'

import Header from '../common/Header'

const Dashboard: React.FunctionComponent<DashboardProps> = (props: DashboardProps) => {
  return (
    <div>
      <Header />
    </div>
  )
}

interface DashboardProps {
  history: History
}

export default Dashboard
