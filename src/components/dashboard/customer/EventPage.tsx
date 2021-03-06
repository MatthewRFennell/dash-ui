import * as React from 'react'

import { History } from 'history'
import SwipeableViews from 'react-swipeable-views'
import { Attendee, Event, Menu } from '../../../typings/BackendTypes'
import './EventPage.scss'
import AttendeesTab from './Tabs/AttendeesTab'
import { ItineraryTab } from './Tabs/ItineraryTab'
import OverviewTab from './Tabs/OverviewTab'

const EventPage: React.FunctionComponent<EventPageProps> = (props) => {
  return (
    <div>
      <SwipeableViews index={props.currentTab} onChangeIndex={props.onTabChange} style={{ overflow: 'hidden' }}>
        <OverviewTab {...props.event} key='overview' />
        <AttendeesTab
          attendees={props.event.attendees}
          event_id={props.event.event_id}
          deleteAttendee={props.deleteAttendee}
          key='attendees'
          onPropsUpdate={props.onPropsUpdate}
        />
        <ItineraryTab
          eventId={props.event.event_id}
          history={props.history}
          itinerary={props.event.itineraries}
          key='itinerary'
          updateMenu={props.updateMenu}
        />
      </SwipeableViews>
    </div>
  )
}

interface EventPageProps {
  deleteAttendee: (x: number, callback: () => void) => void
  event: Event
  history: History
  currentTab: number
  onTabChange: (index: number) => void
  updateMenu: (m: Menu, id: number) => void
  onPropsUpdate: () => void
}

export default EventPage
