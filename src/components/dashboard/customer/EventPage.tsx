import * as React from 'react'

import { History } from 'history'
import SwipeableViews from 'react-swipeable-views'
import { Attendee, Event } from '../../../typings/BackendTypes'
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
          addAttendee={props.addAttendee}
          key='attendees'
        />
        <ItineraryTab
          eventId={props.event.event_id}
          history={props.history}
          itinerary={props.event.itineraries}
          key='itinerary'
        />
      </SwipeableViews>
    </div>
  )
}

interface EventPageProps {
  deleteAttendee: (x: number, callback: () => void) => void
  addAttendee: (x: Attendee) => void
  event: Event
  history: History
  currentTab: number
  onTabChange: (index: number) => void
}

export default EventPage
