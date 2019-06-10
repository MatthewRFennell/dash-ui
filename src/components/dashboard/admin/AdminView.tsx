import { History } from 'history'
import * as React from 'react'

import Typography from '@material-ui/core/Typography'

import fetchProtected from '../../../api/protected'
import { User } from '../../../typings/BackendTypes'
import '../../common/Header'
import './AdminView.scss'
import UserCard from './UserCard'

const AdminView: React.FunctionComponent<AdminViewProps> = (props) => {
  const [users, setUsers] = React.useState<User[]>([])
  React.useEffect(() => {
    fetchProtected(DASH_API + '/users', null, null, 'GET', (res) => {
      setUsers(res.accounts)
      setTimeout(props.onLoadComplete, 750)
    })
  }, [])
  const UserCards = users.map((user, index) => (
    <li key={index}>
      <UserCard {...user} />
    </li>
  ))
  return (
    <div className='admin-view'>
      <div className='user-list'>
        <Typography className='headline'>Customers</Typography>
        <ul>{UserCards}</ul>
      </div>
    </div>
  )
}

interface AdminViewProps {
  history: History
  onLoadComplete: () => void
}

export default AdminView
