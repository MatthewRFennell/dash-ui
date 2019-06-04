import * as React from 'react'

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'

import SwipeableViews from 'react-swipeable-views'
import './EventPage.scss'
import AttendeesTab from './Tabs/AttendeesTab'
import ItineraryTab from './Tabs/ItineraryTab'
import OverviewTab from './Tabs/OverviewTab'

const EventPage: React.FunctionComponent<EventPageProps> = (props) => {
  const [currentTab, setCurrentTab] = React.useState<number>(0)
  const handleTabChange = (_, newValue) => setCurrentTab(newValue)
  return (
    <div>
      <Button className='event-page-back' variant='contained' onClick={props.backAction} color='primary'>
        Back
      </Button>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='tabs-paper'>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            indicatorColor='primary'
            textColor='primary'
            centered={true}
          >
            <Tab label='Overview' />
            <Tab label='Attendees' />
            <Tab label='Itinerary' />
          </Tabs>
        </div>
      </div>
      <SwipeableViews index={currentTab} onChangeIndex={setCurrentTab} style={{ overflow: 'hidden' }}>
        {currentTab === 0 && <OverviewTab {...props} key='overview' />}
        {currentTab === 1 && <AttendeesTab {...props} key='attendees' />}
        {currentTab === 2 && <ItineraryTab {...props} key='itinerary' />}
      </SwipeableViews>
    </div>
  )
}

interface EventPageProps extends EventFullDetails {
  backAction: () => void
  deleteAttendee: (x: number) => void
  addAttendee: (x: AttendeeDetails) => void
}

export interface EventFullDetails {
  name: string
  event_id: number
  blurb: string
  company: string
  date: Date
  tickets: number
  attendees?: AttendeeDetails[]
  transport?: TransportDetails
  image: string
}

export interface AttendeeDetails {
  fname: string
  sname: string
  diet?: string
  attendee_id: number
}

export interface TransportDetails {
  operator: string
  vessel_id: string
  duration: number
  departTime: Date
  departFrom: string
  arriveAt: string
}

export default EventPage
