import { History } from 'history'
import * as React from 'react'
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import SwipeableViews from 'react-swipeable-views'

import fetchProtected from '../../../api/protected'
import { User } from '../../../typings/BackendTypes'
import '../../common/Header'
import FormGenerator from '../../forms/FormGenerator'
import CreateEvent from '../modal/CreateEvent'
import './AdminView.scss'
import DetailCard from './DetailCard'
import UserCard from './UserCard'

const AdminView: React.FunctionComponent<AdminViewProps> = (props) => {
  const [addEvent, setAddEvent] = React.useState<boolean>(false)
  const [users, setUsers] = React.useState<User[]>([])
  const [refreshSymbol, setRefreshSymbol] = React.useState<symbol>(Symbol())
  const [sortBy, setSortBy] = React.useState<'fname' | 'sname'>('fname')
  const [sortDir, setSortDir] = React.useState<'up' | 'down'>('up')
  React.useEffect(() => {
    fetchProtected(DASH_API + '/users', null, null, 'GET', (res) => {
      setUsers(res.accounts)
      setTimeout(props.onLoadComplete, 750)
    })
  }, [])
  const [focusedUser, setFocusedUser] = React.useState<User>(undefined)
  const handleFocus = (user: User) =>
    focusedUser && user.account_id === focusedUser.account_id
      ? () => setFocusedUser(undefined)
      : () => setFocusedUser(user)
  const handleAddEvent = (val) => () => setAddEvent(val)
  const handleOnAdd = () => setRefreshSymbol(Symbol())
  const handleSortBy = (event) => setSortBy(event.target.value)
  const handleSortDirToggle = () => setSortDir((old) => (old === 'up' ? 'down' : 'up'))
  const UserCards = users
    .sort((a, b) => (sortDir === 'up' ? a : b)[sortBy].localeCompare((sortDir === 'up' ? b : a)[sortBy]))
    .map((user, index) => (
      <li key={index}>
        <UserCard {...user} onClick={handleFocus(user)} />
      </li>
    ))
  return (
    <div>
      <SwipeableViews index={props.currentTab} onChangeIndex={props.onTabChange}>
        <div key='customer' className='admin-view'>
          <div className='sort'>
            <Typography
              component='span'
              style={{
                marginRight: '15px',
                color: 'rgba(0, 0, 0, 0.54)',
              }}
            >
              Sort by
            </Typography>
            <TextField variant='outlined' margin='dense' select={true} value={sortBy} onChange={handleSortBy}>
              <MenuItem value='fname'>First Name</MenuItem>
              <MenuItem value='sname'>Surname</MenuItem>
            </TextField>
            <IconButton onClick={handleSortDirToggle}>
              {sortDir === 'up' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
            </IconButton>
          </div>
          <div className='content-wrapper'>
            <Typography className='headline'>Customers</Typography>
            <div className='user-div'>
              <div className='user-list'>
                <ul>{UserCards}</ul>
              </div>
              <ReactCSSTransitionGroup
                transitionName='horizontal-grow'
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
                style={{
                  position: 'sticky',
                  top: 0,
                }}
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
        </div>
        <FormGenerator history={props.history}/>
      </SwipeableViews>
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
  currentTab: number
  onTabChange: (index: number) => void
  onLoadComplete: () => void
  onSetEvent: (id: number) => () => void
}

export default AdminView
