import { History } from 'history'
import * as React from 'react'
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import SwipeableViews from 'react-swipeable-views'
import WordArt from 'react-wordart'

import fetchProtected from '../../../api/protected'
import { Menu, User } from '../../../typings/BackendTypes'
import '../../common/Header'
import FormGenerator from '../../forms/FormGenerator'
import CreateEvent from '../modal/CreateEvent'
import './AdminView.scss'
import DetailCard from './DetailCard'
import MenuOverview from './MenuOverview'
import UserCard from './UserCard'

const AdminView: React.FunctionComponent<AdminViewProps> = (props) => {
  const [addEvent, setAddEvent] = React.useState<boolean>(false)
  const [users, setUsers] = React.useState<User[]>([])
  const [refreshSymbol, setRefreshSymbol] = React.useState<symbol>(Symbol())
  const [sortBy, setSortBy] = React.useState<'fname' | 'sname'>('fname')
  const [sortDir, setSortDir] = React.useState<'up' | 'down'>('up')
  const [createMenu, setCreateMenu] = React.useState<boolean>(false)
  const [currentMenu, setCurrentMenu] = React.useState<Menu>(undefined)
  const wordartChoices = [
    'rainbow',
    'blues',
    'superhero',
    'radial',
    'tilt',
    'purple',
    'horizon',
    'italicOutline',
    'slate',
  ]
  const wordArtStyle = wordartChoices[Math.floor(Math.random() * wordartChoices.length)]

  console.log('Current menu', currentMenu)

  React.useEffect(() => {
    fetchProtected(DASH_API + '/users', null, null, 'GET', (res) => {
      setUsers(res.accounts)
      setTimeout(props.onLoadComplete, 750)
    })
  }, [])
  const [focusedUser, setFocusedUser] = React.useState<User>(undefined)

  const moveToMenu = (state: boolean) => (menu: Menu = undefined) => () => {
    setCurrentMenu(menu)
    setCreateMenu(state)
  }

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
        <UserCard
          {...user}
          onClick={handleFocus(user)}
          raised={focusedUser && user.account_id === focusedUser.account_id}
        />
      </li>
    ))
  return (
    <div>
      <SwipeableViews index={props.currentTab} onChangeIndex={props.onTabChange}>
        <div key='customer' className='admin-view'>
          <div className='content-wrapper'>
            <div
              className='title-box'
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div style={{ width: '240px', marginLeft: '30px', opacity: 0 }}>search</div>
              <div style={{ margin: '30px' }}>
                <WordArt text='Customers' theme={wordArtStyle} fontSize={48} />
              </div>
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
            </div>
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
                      onClose={handleFocus(focusedUser)}
                    />
                  </div>
                )}
              </ReactCSSTransitionGroup>
            </div>
          </div>
        </div>
        <div key='menu' className='admin-view'>
          <ReactCSSTransitionGroup
            transitionName='fade'
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            style={{ overflowY: 'auto', overflowX: 'hidden' }}
          >
            {createMenu ? (
              <div className='content-wrapper' key='editor'>
                <FormGenerator
                  edit={currentMenu !== undefined}
                  presetMenu={currentMenu}
                  onBack={moveToMenu(false)()}
                  history={props.history}
                />
              </div>
            ) : (
              <div key='selector'>
                <MenuOverview move={moveToMenu(true)} />
                <Fab
                  variant='extended'
                  id='fab'
                  onClick={moveToMenu(true)()}
                  style={{ fontWeight: 'bold' }}
                  color='primary'
                >
                  <AddIcon style={{ marginRight: '10px' }} /> Add Menu
                </Fab>
              </div>
            )}
          </ReactCSSTransitionGroup>
        </div>
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
