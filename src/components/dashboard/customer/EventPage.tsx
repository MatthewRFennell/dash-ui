import * as React from 'react'

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'

import SwipeableViews from 'react-swipeable-views'
import './EventPage.scss'
import AttendeesTab, { AttendeeDetails } from './Tabs/AttendeesTab'
import ItineraryTab, { ItineraryDetails } from './Tabs/ItineraryTab'
import OverviewTab, { OverviewTabProps } from './Tabs/OverviewTab'

const EventPage: React.FunctionComponent<EventPageProps> = (props) => {
  const [currentTab, setCurrentTab] = React.useState<number>(0)
  const handleTabChange = (_, newValue) => setCurrentTab(newValue)
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='tabs-paper'>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            indicatorColor='primary'
            textColor='primary'
            centered={true}
          >
            <Tab label='Overview' style={{ fontWeight: 'bold' }} />
            <Tab label='Attendees' style={{ fontWeight: 'bold' }} />
            <Tab label='Itinerary' style={{ fontWeight: 'bold' }} />
          </Tabs>
        </div>
      </div>
      <SwipeableViews index={currentTab} onChangeIndex={setCurrentTab} style={{ overflow: 'hidden' }}>
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
}

export interface EventFullDetails extends OverviewTabProps {
  attendees: AttendeeDetails[]
  itineraries: ItineraryDetails[]
}

export default EventPage
