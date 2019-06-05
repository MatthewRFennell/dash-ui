import * as React from 'react'

import SwipeableViews from 'react-swipeable-views'
import './EventPage.scss'
import AttendeesTab, { AttendeeDetails } from './Tabs/AttendeesTab'
import ItineraryTab, { ItineraryDetails } from './Tabs/ItineraryTab'
import OverviewTab, { OverviewTabProps } from './Tabs/OverviewTab'

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
        <ItineraryTab itinerary={props.event.itineraries} key='itinerary' />
      </SwipeableViews>
    </div>
  )
}

interface EventPageProps {
  deleteAttendee: (x: number) => void
  addAttendee: (x: AttendeeDetails) => void
  event: EventFullDetails
  currentTab: number
  onTabChange: (index) => void
}

export interface EventFullDetails extends OverviewTabProps {
  attendees: AttendeeDetails[]
  itineraries: ItineraryDetails[]
}

export default EventPage
