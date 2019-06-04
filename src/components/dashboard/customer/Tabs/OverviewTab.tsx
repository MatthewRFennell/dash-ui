import * as React from 'react'

import Typography from '@material-ui/core/Typography'

import AddAttendee from '../../modal/AddAttendee'
import { AttendeeDetails, EventFullDetails } from '../EventPage'

import '../EventPage.scss'

const OverviewTab: React.FunctionComponent<OverviewTabProps> = (props) => {

  return (
    <div className='event-page-view'>
      <div className='event-page-left-panel'>
        <img src={props.image} className='event-page-image' />
      </div>
      <div className='event-page-mock-panel' />
      <div className='event-page-right-panel'>
        <Typography className='event-page-title'>{props.name}</Typography>
        <Typography className='event-page-block-title'>For {props.company}</Typography>
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
          <Typography className='event-page-body'>{props.tickets}</Typography>
        </div>
      </div>
    </div>
  )
}

interface OverviewTabProps extends EventFullDetails {
  backAction: () => void
  deleteAttendee: (x: number) => void
  addAttendee: (x: AttendeeDetails) => void
}

export default OverviewTab
