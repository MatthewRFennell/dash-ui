import * as React from 'react'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import PersonAddIcon from '@material-ui/icons/PersonAdd'

import AddAttendee from '../modal/AddAttendee'

import './EventPage.scss'

const EventPage: React.FunctionComponent<EventPageProps> = (props) => {
  const [attendeeModalOpen, setAttendeeModalOpen] = React.useState<boolean>(false)
  const handleModalOpen = () => setAttendeeModalOpen(true)
  const handleModalClose = () => setAttendeeModalOpen(false)

  const handleDelete = (id) => (event) => {
    props.deleteAttendee(id)
  }

  const attendeeTable =
    props.attendees.length !== 0 ? (
      <Table size='small' className='attendee-table'>
        <TableHead>
          <TableRow>
            <TableCell className='table-cell'>First Name</TableCell>
            <TableCell className='table-cell'>Last Name</TableCell>
            <TableCell className='table-cell'>Dietary Requirements</TableCell>
            <TableCell className='table-cell' />
          </TableRow>
        </TableHead>
        <TableBody>
          {props.attendees.map((attendee, index) => (
            <TableRow key={index}>
              <TableCell className='table-cell'>{attendee.fname}</TableCell>
              <TableCell className='table-cell'>{attendee.sname}</TableCell>
              <TableCell className='table-cell'>{attendee.diet || 'N/A'}</TableCell>
              <TableCell className='table-cell'>
                <IconButton onClick={handleDelete(attendee.attendee_id)}>
                  <CloseIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ) : (
      undefined
    )
  return (
    <div className='event-page-view'>
      <div className='event-page-left-panel'>
        <Button className='event-page-back' variant='contained' onClick={props.backAction} color='primary'>
          Back
        </Button>
        <img src={DASH_API + '/eventImage?id=' + props.event_id} className='event-page-image' />
      </div>
      <div className='event-page-mock-panel' />
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
          <Typography className='event-page-body'>{props.tickets}</Typography>
        </div>
        <div className='event-page-detail'>
          <Typography className='event-page-block-title'>Attendees</Typography>
          {attendeeTable}
          <Button variant='outlined' color='primary' className='attendee-button' onClick={handleModalOpen}>
            <PersonAddIcon className='add-icon' />
            Add Attendee
          </Button>
        </div>
        {props.transport.operator !== undefined && (
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
                  <Typography className='event-page-body'>{props.transport.vessel_id}</Typography>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <Typography className='event-page-block-title'>Duration</Typography>
                  <Typography className='event-page-body'>{props.transport.duration}</Typography>
                </div>
              </ListItem>
              <ListItem>
                <div>
                  <Typography className='event-page-block-title'>Departing At</Typography>
                  <Typography className='event-page-body'>
                    {props.transport.departTime.getDay()}/{props.transport.departTime.getMonth()}/
                    {props.transport.departTime.getFullYear()} {props.transport.departTime.getHours()}:
                    {props.transport.departTime.getMinutes()}
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
        <AddAttendee add={props.addAttendee} open={attendeeModalOpen} onClose={handleModalClose} id={props.event_id} />
      </div>
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
  date: Date
  tickets: number
  attendees?: AttendeeDetails[]
  transport?: TransportDetails
}

export interface AttendeeDetails {
  fname: string
  sname: string
  diet?: string
  attendee_id: number
}

interface TransportDetails {
  operator: string
  vessel_id: string
  duration: number
  departTime: Date
  departFrom: string
  arriveAt: string
}

export default EventPage
