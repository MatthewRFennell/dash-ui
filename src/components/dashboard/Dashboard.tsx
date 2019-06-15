import * as React from 'react'
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

import { History } from 'history'
import fetchProtected from '../../../src/api/protected'
import { Header } from '../common/Header'
import { CustomerView } from './customer/CustomerView'
import EventPage from './customer/EventPage'

import authHeader from '../../api/authHeader'
import { Event, Menu } from '../../typings/BackendTypes'
import Loader from '../misc/Loader'
import AdminView from './admin/AdminView'
import './Dashboard.scss'

const Dashboard: React.FunctionComponent<DashboardProps> = (props: DashboardProps) => {
  const [loading, setLoading] = React.useState<boolean>(true)
  const [openEvent, setOpenEvent] = React.useState<Event>(undefined)
  const [modalOpen, setModalOpen] = React.useState<boolean>(false)
  const [currentTab, setCurrentTab] = React.useState<number>(0)
  const [currentAdminTab, setCurrentAdminTab] = React.useState<number>(0)

  const handleTabChange = (_, newValue) => setCurrentTab(newValue)
  const handleAdminTabChange = (_, newValue) => setCurrentAdminTab(newValue)

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
        setOpenEvent((currentEvent: Event) => {
          return {
            ...currentEvent,
            ...event,
          }
        })
      }
    })
  }

  const updateMenuChoice = (menu: Menu, itineraryID: number) => {
    setOpenEvent((oldEvent) => ({
      ...oldEvent,
      itineraries: oldEvent.itineraries.map((it) =>
        it.itinerary_id !== itineraryID
          ? it
          : {
              ...it,
              menu,
            },
      ),
    }))
  }

  const deleteAttendee = (attendeeID, callback) => {
    fetchProtected(DASH_API + '/attendee', null, { attendee_id: attendeeID }, 'DELETE', (res) => {
      if (res.success) {
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
    if (id !== undefined) {
      /* Fetch from endpoint */
      fetchProtected(`${DASH_API}/event?event_id=${id}`, null, null, 'GET', (res) => {
        const newEvent = {
          ...res.event,
          date: new Date(res.event.date),
        }
        setOpenEvent(newEvent)
      })
    } else {
      setOpenEvent(undefined)
    }
  }

  const handleReloadEvent = () => {
    const url = DASH_API + '/event?event_id=' + openEvent.event_id
    fetch(url, {
      method: 'GET',
      headers: {
        ...authHeader(),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const newEvent = {
          ...res.event,
          date: new Date(res.event.date),
        }
        setOpenEvent(newEvent)
      })
  }

  return (
    <div
      className={
        (props.vaporwave ? (openEvent ? 'dashboard-vaporwave-backdrop ' : 'dashboard-view-vaporwave ') : '') +
        'dashboard-view'
      }
    >
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
              admin={props.admin}
              history={props.history}
              onBack={openEvent ? handleSetEvent() : undefined}
              onHome={openEvent ? handleSetEvent() : undefined}
              onTabChange={openEvent ? handleTabChange : undefined}
              onAdminTabChange={props.admin && !openEvent ? handleAdminTabChange : undefined}
              currentTab={currentTab}
              currentAdminTab={currentAdminTab}
              key='header'
            />
            {openEvent === undefined ? (
              props.admin ? (
                <div key='admin-view'>
                  <AdminView
                    history={props.history}
                    onLoadComplete={handleLoadingFinish}
                    onSetEvent={handleSetEvent}
                    currentTab={currentAdminTab}
                    onTabChange={setCurrentAdminTab}
                  />
                </div>
              ) : (
                <div key='customer-view'>
                  <CustomerView
                    history={props.history}
                    setActiveEvent={handleSetEvent}
                    onLoadComplete={handleLoadingFinish}
                  />
                </div>
              )
            ) : (
              <EventPage
                event={openEvent}
                deleteAttendee={deleteAttendee}
                addAttendee={addAttendee}
                key='event-page'
                currentTab={currentTab}
                onTabChange={setCurrentTab}
                history={props.history}
                updateMenu={updateMenuChoice}
                onPropsUpdate={handleReloadEvent}
              />
            )}
          </ReactCSSTransitionGroup>
        </div>
      </ReactCSSTransitionGroup>
    </div>
  )
}

interface DashboardProps {
  history: History
  admin?: boolean
  vaporwave: boolean
}

const mapStateToProps = (state) => {
  return {
    admin: state.user.admin,
    vaporwave: state.meme.vaporwave,
  }
}

export default connect(mapStateToProps)(Dashboard)
