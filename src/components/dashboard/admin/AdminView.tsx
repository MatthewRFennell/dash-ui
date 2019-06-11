import { History } from 'history'
import * as React from 'react'
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Typography from '@material-ui/core/Typography'

import fetchProtected from '../../../api/protected'
import { User } from '../../../typings/BackendTypes'
import '../../common/Header'
import CreateEvent from '../modal/CreateEvent'
import './AdminView.scss'
import DetailCard from './DetailCard'
import UserCard from './UserCard'

const AdminView: React.FunctionComponent<AdminViewProps> = (props) => {
  const [addEvent, setAddEvent] = React.useState<boolean>(false)
  const [users, setUsers] = React.useState<User[]>([])
  const [refreshSymbol, setRefreshSymbol] = React.useState<symbol>(Symbol())
  React.useEffect(() => {
    fetchProtected(DASH_API + '/users', null, null, 'GET', (res) => {
      setUsers(res.accounts)
      setTimeout(props.onLoadComplete, 750)
    })
  }, [])
  const [focusedUser, setFocusedUser] = React.useState<User>(undefined)
  const handleFocus = (user: User) => {
    if (focusedUser && user.account_id === focusedUser.account_id) {
      return () => setFocusedUser(undefined)
    } else {
      return () => setFocusedUser(user)
    }
  }
  const handleAddEvent = (val) => () => {
    setAddEvent(val)
  }
  const handleOnAdd = () => {
    setRefreshSymbol(Symbol())
  }
  const UserCards = users.map((user, index) => (
    <li key={index}>
      <UserCard {...user} onClick={handleFocus(user)} />
    </li>
  ))
  return (
    <div className='admin-view'>
      <div>
        <Typography className='headline'>Customers</Typography>
        <div className='user-div'>
          <div className='user-list'>
            <ul>{UserCards}</ul>
          </div>
          <ReactCSSTransitionGroup
            transitionName='horizontal-grow'
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {focusedUser && (
              <div key='detail' className='horizontal-grow-div'>
                <DetailCard
                  {...focusedUser}
                  onAddEventClick={handleAddEvent(true)}
                  onSetEvent={props.onSetEvent}
                  refresh={refreshSymbol}
                />
              </div>
            )}
          </ReactCSSTransitionGroup>
        </div>
      </div>
      <CreateEvent
        open={addEvent}
        onClose={handleAddEvent(false)}
        email={focusedUser ? focusedUser.email : undefined}
        onAddEvent={handleOnAdd}
      />
    </div>
  )
}

interface AdminViewProps {
  history: History
  onLoadComplete: () => void
  onSetEvent: (id: number) => () => void
}

export default AdminView
