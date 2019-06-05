import * as React from 'react'
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Airplane from '@material-ui/icons/AirplanemodeActive'
import CloseIcon from '@material-ui/icons/Close'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import AddAttendee from '../../modal/AddAttendee'
import TransportSection, { TransportDetails } from './TransportSection'

const AttendeesTab: React.FunctionComponent<AttendeesTabProps> = (props) => {
  const [attendeeModalOpen, setAttendeeModalOpen] = React.useState<boolean>(false)
  const [transportActive, setTransportActive] = React.useState<boolean>(false)
  const [attendeeTransport, setAttendeeTransport] = React.useState<number>(-1)

  const setIndex = (id) => () => {
    if (id === attendeeTransport) {
      setAttendeeTransport(-1)
      setTransportActive(false)
    } else {
      setAttendeeTransport(id)
      setTransportActive(true)
    }
  }

  const handleModalOpen = () => setAttendeeModalOpen(true)
  const handleModalClose = () => setAttendeeModalOpen(false)

  const handleDelete = (id) => () => {
    props.deleteAttendee(id)
  }

  let attendeeTransportDetails: TransportDetails
  let name
  if (attendeeTransport >= 0) {
    name = props.attendees[attendeeTransport].fname + ' ' + props.attendees[attendeeTransport].sname
    attendeeTransportDetails = {
      ...props.attendees[attendeeTransport].transport,
      departTime: new Date(props.attendees[attendeeTransport].transport.departTime),
    }
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
                {attendee.transport ? (
                  <IconButton color={index === attendeeTransport ? 'primary' : 'default'} onClick={setIndex(index)}>
                    <Airplane />
                  </IconButton>
                ) : (
                  undefined
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ) : (
      undefined
    )

  return (
    <div className='event-page-view' style={{ justifyContent: 'center', overflowY: 'auto' }}>
      <div>
        <Paper className='event-page-center-paper'>
          <Typography className='attendee-title'>Attendees</Typography>
          {attendeeTable}
          <Button variant='outlined' color='primary' className='attendee-button' onClick={handleModalOpen}>
            <PersonAddIcon className='add-icon' />
            Add Attendee
          </Button>
        </Paper>
      </div>
      <ReactCSSTransitionGroup
        transitionName='horizontal-grow'
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        {transportActive && <TransportSection {...attendeeTransportDetails} name={name} />}
      </ReactCSSTransitionGroup>
      <AddAttendee add={props.addAttendee} open={attendeeModalOpen} onClose={handleModalClose} id={props.event_id} />
    </div>
  )
}

interface AttendeesTabProps {
  event_id: number
  attendees: AttendeeDetails[]
  deleteAttendee: (id: number) => void
  addAttendee: (x: AttendeeDetails) => void
}

export interface AttendeeDetails {
  attendee_id: number
  fname: string
  sname: string
  diet: string
  transport: TransportDetails
}

export default AttendeesTab
