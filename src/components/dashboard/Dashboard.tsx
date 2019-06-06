import * as React from 'react'
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { History } from 'history'
import fetchProtected from '../../../src/api/protected'
import { Header } from '../common/Header'
import { CustomerView } from './customer/CustomerView'
import EventPage, { EventFullDetails } from './customer/EventPage'

import Loader from '../misc/Loader'
import './Dashboard.scss'
import { CreateEvent } from './modal/CreateEvent'

const Dashboard: React.FunctionComponent<DashboardProps> = (props: DashboardProps) => {
  const [loading, setLoading] = React.useState<boolean>(true)
  const [openEvent, setOpenEvent] = React.useState<EventFullDetails | undefined>(undefined)
  const [modalOpen, setModalOpen] = React.useState<boolean>(false)
  const [currentTab, setCurrentTab] = React.useState<number>(0)

  const handleTabChange = (_, newValue) => setCurrentTab(newValue)

  const addAttendee = (attendee) => {
    const newAttendees = openEvent.attendees
    newAttendees.push(attendee)
    setOpenEvent({
      ...openEvent,
      attendees: newAttendees,
    })
  }

  const editEvent = (event) => {
    fetchProtected(DASH_API + '/editEvent', null, { ...event, event_id: openEvent.event_id }, 'PUT', (res) => {
      if (res.success) {
        setOpenEvent((currentEvent: EventFullDetails) => {
          return {
            ...currentEvent,
            ...event,
          }
        })
      }
    })
  }

  const deleteAttendee = (attendeeID, callback) => {
    fetchProtected(DASH_API + '/attendee', null, { attendee_id: attendeeID }, 'DELETE', (res) => {
      if (res.success) {
        console.log('Delete Success')
        if (callback) {
          callback()
        }
        const newAttendees = openEvent.attendees.filter((a) => a.attendee_id !== attendeeID)
        setOpenEvent({
          ...openEvent,
          attendees: newAttendees,
        })
      }
    })
  }

  const handleModalOpen = () => setModalOpen(true)
  const handleModalClose = () => setModalOpen(false)
  const handleLoadingFinish = () => setLoading(false)

  const handleSetEvent = (id?: number) => () => {
    setCurrentTab(0) // Reset tab
    console.log('Set event', id)
    if (id !== undefined) {
      /* Fetch from endpoint */
      fetchProtected(`${DASH_API}/event?event_id=${id}`, null, null, 'GET', (res) => {
        console.log(res)
        const newEvent = {
          ...res.event,
          date: new Date(res.event.date),
        }
        console.log(newEvent)
        setOpenEvent(newEvent)
      })
    } else {
      setOpenEvent(undefined)
    }
  }

  return (
    <div className='dashboard-view'>
      <ReactCSSTransitionGroup transitionName='fade' transitionEnterTimeout={500} transitionLeaveTimeout={500}>
        {loading && (
          <Loader
            style={{
              width: '100vw',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000000,
              position: 'fixed',
              backgroundColor: 'white',
            }}
            key='loader'
          />
        )}
        <div key='main'>
          <ReactCSSTransitionGroup transitionName='fade' transitionEnterTimeout={300} transitionLeaveTimeout={300}>
            <Header
              history={props.history}
              onBack={openEvent ? handleSetEvent() : undefined}
              onHome={openEvent ? handleSetEvent() : undefined}
              onTabChange={openEvent ? handleTabChange : undefined}
              currentTab={currentTab}
              key='header'
            />
            {openEvent === undefined ? (
              <div key='customer-view'>
                <CustomerView
                  history={props.history}
                  setActiveEvent={handleSetEvent}
                  onLoadComplete={handleLoadingFinish}
                />
                <Fab className='dashboard-fab' variant='extended' color='primary' onClick={handleModalOpen}>
                  <AddIcon className='dashboard-add-icon' />
                  Add event
                </Fab>
              </div>
            ) : (
              <EventPage
                event={openEvent}
                deleteAttendee={deleteAttendee}
                addAttendee={addAttendee}
                key='event-page'
                currentTab={currentTab}
                onTabChange={setCurrentTab}
                history={props.history}
              />
            )}
          </ReactCSSTransitionGroup>
          <CreateEvent open={modalOpen} onClose={handleModalClose} />
        </div>
      </ReactCSSTransitionGroup>
    </div>
  )
}

interface DashboardProps {
  history: History
}

export default Dashboard
