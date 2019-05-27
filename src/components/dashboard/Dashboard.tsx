import * as React from 'react'

const Dashboard: React.FunctionComponent<DashboardProps> = (props: DashboardProps) => {
  return (
    <div>
      Hello
    </div>
  )
}

interface DashboardProps {
  history: History
}
