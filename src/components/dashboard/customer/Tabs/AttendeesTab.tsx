import * as React from 'react'
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import { Attendee, Transport } from '../../../../types/BackendTypes'
import AddAttendee from '../../modal/AddAttendee'
import ConfirmDialog from '../../modal/ConfirmDialog'
import DetailsPanel from './DetailsPanel'

const AttendeesTab: React.FunctionComponent<AttendeesTabProps> = (props) => {
  const [attendeeModalOpen, setAttendeeModalOpen] = React.useState<boolean>(false)
  const [confirmModalOpen, setConfirmModalOpen] = React.useState<boolean>(false)
  const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false)
  const [detailActive, setdetailActive] = React.useState<boolean>(false)
  const [attendeeTransport, setAttendeeTransport] = React.useState<number>(-1)
  const [modalLoading, setModalLoading] = React.useState<boolean>(false)

  const setIndex = (id) => () => {
    if (id === attendeeTransport) {
      setAttendeeTransport(-1)
      setdetailActive(false)
    } else {
      setAttendeeTransport(id)
      setdetailActive(true)
    }
  }

  const handleModalOpen = () => setAttendeeModalOpen(true)
  const handleModalClose = () => setAttendeeModalOpen(false)
  const handleConfirmModal = (state) => () => setConfirmModalOpen(state)
  const handleDeleteModal = (state) => () => setDeleteModalOpen(state)

  const handleDelete = (id) => () => {
    setModalLoading(true)
    props.deleteAttendee(id, () => {
      setAttendeeTransport(-1)
      setdetailActive(false)
      setModalLoading(false)
      setDeleteModalOpen(false)
    })
  }

  let attendeeTransportDetails: Transport
  let name
  let formID
  if (attendeeTransport >= 0) {
    formID = props.attendees[attendeeTransport].form_id
    name = props.attendees[attendeeTransport].fname + ' ' + props.attendees[attendeeTransport].sname
    attendeeTransportDetails = props.attendees[attendeeTransport].transport
      ? {
          ...props.attendees[attendeeTransport].transport,
          departTime: new Date(props.attendees[attendeeTransport].transport.departTime),
        }
      : undefined
  }

  const attendeeTable =
    props.attendees.length !== 0 ? (
      <Table size='small' className='attendee-table'>
        <TableHead>
          <TableRow>
            <TableCell className='table-cell'>First Name</TableCell>
            <TableCell className='table-cell'>Last Name</TableCell>
            <TableCell className='table-cell'>Dietary Requirements</TableCell>
            <TableCell className='table-cell'>Miscellaneous</TableCell>
            <TableCell className='table-cell'>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.attendees.map((attendee, index) => (
            <TableRow key={attendee.attendee_id}>
              <TableCell className='table-cell'>{attendee.fname}</TableCell>
              <TableCell className='table-cell'>{attendee.sname} </TableCell>
              <TableCell className='table-cell'>{attendee.diet || 'N/A'}</TableCell>
              <TableCell className='table-cell'>
                {attendee.transport !== null && <AirplanemodeActiveIcon style={{ opacity: 0.54 }} />}
              </TableCell>
              <TableCell className='table-cell'>
                <IconButton onClick={setIndex(index)} color={index === attendeeTransport ? 'primary' : 'default'}>
                  <MoreVertIcon />
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
    <div className='event-page-view' style={{ justifyContent: 'center', overflowY: 'auto' }}>
      <div>
        <div className='event-page-center-paper'>
          <Typography className='attendee-title'>Attendees</Typography>
          {attendeeTable}
          <Button variant='outlined' color='primary' className='attendee-button' onClick={handleModalOpen}>
            <PersonAddIcon className='add-icon' />
            Add Attendee
          </Button>
        </div>
      </div>
      <ReactCSSTransitionGroup
        transitionName='horizontal-grow'
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        style={{
          position: 'sticky',
          top: 0,
        }}
      >
        {detailActive && (
          <DetailsPanel
            name={name}
            transport={attendeeTransportDetails}
            confirm={handleConfirmModal(true)}
            delete={handleDeleteModal(true)}
            form_id={formID}
          />
        )}
      </ReactCSSTransitionGroup>
      <AddAttendee add={props.addAttendee} open={attendeeModalOpen} onClose={handleModalClose} id={props.event_id} />
      <ConfirmDialog
        title='Confirm attendee'
        content={`Confirm attendee ${name}'s attendance`}
        open={confirmModalOpen}
        confirm={{
          text: 'Confirm',
          action: () => {
            setModalLoading(true)
            setTimeout(() => {
              setModalLoading(false)
            }, 1000)
          },
        }}
        alt={{
          text: 'Cancel',
          action: handleConfirmModal(false),
        }}
        loading={modalLoading}
      />
      <ConfirmDialog
        title='Delete attendee'
        content={`Delete attendee ${name} and their associated details`}
        open={deleteModalOpen}
        confirm={{
          text: 'Delete',
          action: handleDelete(
            (
              props.attendees[attendeeTransport] || {
                attendee_id: -1,
              }
            ).attendee_id,
          ),
        }}
        alt={{
          text: 'Cancel',
          action: handleDeleteModal(false),
        }}
        loading={modalLoading}
      />
    </div>
  )
}

interface AttendeesTabProps {
  event_id: number
  attendees: Attendee[]
  deleteAttendee: (id: number, callback: () => void) => void
  addAttendee: (x: Attendee) => void
}

export default AttendeesTab
