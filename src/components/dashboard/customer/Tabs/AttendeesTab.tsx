import * as React from 'react'

import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Airplane from '@material-ui/icons/AirplanemodeActive'
import CloseIcon from '@material-ui/icons/Close'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import AddAttendee from '../../modal/AddAttendee'
import { AttendeeDetails, EventFullDetails } from '../EventPage'
import TransportSection from './TransportSection'

const AttendeesTab: React.FunctionComponent<AttendeesTabProps> = (props) => {

  const [attendeeModalOpen, setAttendeeModalOpen] = React.useState<boolean>(false)

  const [attendeeTransport, setAttendeeTransport] = React.useState<number>(-1)

  const setIndex = (id) => (event) => setAttendeeTransport(id)

  const handleModalOpen = () => setAttendeeModalOpen(true)
  const handleModalClose = () => setAttendeeModalOpen(false)

  const handleDelete = (id) => () => {
    props.deleteAttendee(id)
  }

  let attendeeTransportDetails
  if (attendeeTransport >= 0) {
    attendeeTransportDetails = props.attendees[attendeeTransport].transport
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
            <TableRow key={attendee.attendee_id}>
              <TableCell className='table-cell'>{attendee.fname}</TableCell>
              <TableCell className='table-cell'>{attendee.sname} </TableCell>
              <TableCell className='table-cell'>{attendee.diet || 'N/A'}</TableCell>
              <TableCell className='table-cell'>
                <IconButton onClick={handleDelete(attendee.attendee_id)}>
                  <CloseIcon />
                </IconButton>
                {attendee.transport ?
                <IconButton onClick={setIndex(index)}>
                  <Airplane/>
                </IconButton>
                :
                undefined
                }
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
        <div className='event-page-detail'>
          <Typography className='event-page-block-title'>Attendees</Typography>
          {attendeeTable}
          <Button variant='outlined' color='primary' className='attendee-button' onClick={handleModalOpen}>
            <PersonAddIcon className='add-icon' />
            Add Attendee
          </Button>
        </div>
      </div>
      <div className='event-page-mock-panel' />
      <div className='event-page-right-panel'>
        <TransportSection transport={attendeeTransportDetails} />
      </div>
      <AddAttendee add={props.addAttendee} open={attendeeModalOpen} onClose={handleModalClose} id={props.event_id} />
    </div>
  )
}

interface AttendeesTabProps extends EventFullDetails {
  backAction: () => void
  deleteAttendee: (x: number) => void
  addAttendee: (x: AttendeeDetails) => void
}

export default AttendeesTab
