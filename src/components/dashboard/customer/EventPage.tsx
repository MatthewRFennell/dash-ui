import * as React from 'react'

import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import './EventPage.scss'

const EventPage: React.FunctionComponent<EventPageProps> = (props) => {

  const attendeeList = props.attendees
    ? props.attendees.map((attendee, index) => (
        <ListItem key={index}>
          <Typography className='event-page-body'>
            {attendee.sname}, {attendee.fname}, {attendee.diet}
          </Typography>
        </ListItem>
      ))
    : undefined
  return (
    <div className='event-page-view'>
      <div className='event-page-left-panel'>
        <Button className='event-page-back' onClick={props.backAction} color='primary'>
          Back
        </Button>
        <img src={DASH_API + '/eventImage?id=' + props.event_id} className='event-page-image' />
      </div>
      <div className='event-page-mock-panel'/>
      <div className='event-page-right-panel'>
        <Typography className='event-page-title'>{props.name}</Typography>
        <div className='event-page-detail'>
          <Typography className='event-page-block-title'>Event Date</Typography>
          <Typography className='event-page-body'>
            {props.date.getDay()}/{props.date.getMonth()}/{props.date.getFullYear()}
          </Typography>
        </div>
        <div className='event-page-detail'>
          <Typography className='event-page-block-title'>Event Description</Typography>
          <Typography className='event-page-body'>{props.blurb}</Typography>
        </div>
        <div className='event-page-detail'>
          <Typography className='event-page-block-title'>Number of Tickets</Typography>
          <Typography className='event-page-body'>{props.numTickets}</Typography>
        </div>
        {attendeeList !== undefined && (
          <div className='event-page-detail'>
            <Typography className='event-page-block-title'>Attendees</Typography>
            <List>{attendeeList}</List>
          </div>
        )}
        {props.transport !== undefined && (
          <div className='event-page-detail'>
            <Typography className='event-page-block-title'>Transport</Typography>
            <List>
              <ListItem>
                <div>
                  <Typography className='event-page-block-title'>Operator</Typography>
                  <Typography className='event-page-body'>{props.transport.operator}</Typography>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <Typography className='event-page-block-title'>Vessel Number</Typography>
                  <Typography className='event-page-body'>{props.transport.vesselNumber}</Typography>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <Typography className='event-page-block-title'>Duratiom</Typography>
                  <Typography className='event-page-body'>{props.transport.duration}</Typography>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <Typography className='event-page-block-title'>Departing At</Typography>
                  <Typography className='event-page-body'>
                    {props.transport.departTime.getDay()}/{props.transport.departTime.getMonth()}
                    /{props.transport.departTime.getFullYear()}{' '}

                    {props.transport.departTime.getHours()}:{props.transport.departTime.getMinutes()}
                  </Typography>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <Typography className='event-page-block-title'>Departing from</Typography>
                  <Typography className='event-page-body'>{props.transport.departFrom}</Typography>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <Typography className='event-page-block-title'>Arriving at</Typography>
                  <Typography className='event-page-body'>{props.transport.arriveAt}</Typography>
                </div>
              </ListItem>
            </List>
          </div>
        )}
      </div>
    </div>
  )
}

interface EventPageProps extends EventFullDetails {
  backAction: () => void
}

export interface EventFullDetails {
  name: string
  event_id: number
  blurb: string
  date: Date
  numTickets: number
  attendees?: AttendeeDetails[]
  transport?: TransportDetails
}

interface AttendeeDetails {
  fname: string
  sname: string
  diet?: string
}

interface TransportDetails {
  operator: string
  vesselNumber: string
  duration: number
  departTime: Date
  departFrom: string
  arriveAt: string
}

export default EventPage
