import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'

const TransportSection = (props: TransportSectionProps) => {
  console.log(props)
  return props.active ? (
    <div className='event-page-detail'>
      <Typography className='event-page-block-title'>Transport</Typography>
      <List>
        <ListItem>
          <div>
            <Typography className='event-page-block-title'>Attendee</Typography>
            <Typography className='event-page-body'>{props.name}</Typography>
          </div>
        </ListItem>
        <ListItem>
          <div>
            <Typography className='event-page-block-title'>Operator</Typography>
            <Typography className='event-page-body'>{props.operator}</Typography>
          </div>
        </ListItem>
        <ListItem>
          <div>
            <Typography className='event-page-block-title'>Vessel Number</Typography>
            <Typography className='event-page-body'>{props.vessel_id}</Typography>
          </div>
        </ListItem>
        <ListItem>
          <div>
            <Typography className='event-page-block-title'>Duration</Typography>
            <Typography className='event-page-body'>{props.duration}</Typography>
          </div>
        </ListItem>
        <ListItem>
          <div>
            <Typography className='event-page-block-title'>Departing At</Typography>
            <Typography className='event-page-body'>
              {props.departTime.getDay()}/{props.departTime.getMonth()}/{props.departTime.getFullYear()}{' '}
              {props.departTime.getHours()}:{props.departTime.getMinutes()}
            </Typography>
          </div>
        </ListItem>
        <ListItem>
          <div>
            <Typography className='event-page-block-title'>Departing from</Typography>
            <Typography className='event-page-body'>{props.departFrom}</Typography>
          </div>
        </ListItem>
        <ListItem>
          <div>
            <Typography className='event-page-block-title'>Arriving at</Typography>
            <Typography className='event-page-body'>{props.arriveAt}</Typography>
          </div>
        </ListItem>
      </List>
    </div>
  ) : (
    <h1>Select a attendee to see their trasport details</h1>
  )
}

interface TransportSectionProps extends TransportDetails {
  name: string
  active: boolean
}

export interface TransportDetails {
  operator: string
  vessel_id: string
  duration: number
  departTime: Date
  departFrom: string
  arriveAt: string
}

export default TransportSection
