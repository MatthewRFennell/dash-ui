import * as React from 'react'
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import LinkIcon from '@material-ui/icons/Link'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircleOutline'

import { CopyToClipboard } from 'react-copy-to-clipboard'

import authHeader from '../../../../api/authHeader'
import { Attendee, Transport } from '../../../../typings/BackendTypes'
import AddAttendee from '../../modal/AddAttendee'
import ConfirmDialog from '../../modal/ConfirmDialog'
import DetailsPanel from './DetailsPanel'

const AttendeesTab: React.FunctionComponent<AttendeesTabProps> = (props) => {
  const [attendeeModalOpen, setAttendeeModalOpen] = React.useState<boolean>(false)
  const [confirmModalOpen, setConfirmModalOpen] = React.useState<boolean>(false)
  const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false)
  const [detailActive, setDetailActive] = React.useState<Attendee>(undefined)
  const [modalLoading, setModalLoading] = React.useState<boolean>(false)
  const [confirmedAttendees, setConfirmedAttendees] = React.useState<number[]>([])
  const [snackbarOpen, setSnackbarOpen] = React.useState<string>(undefined)

  const setAttendee = (attendee: Attendee) => () => {
    if (attendee.attendee_id === (detailActive || { attendee_id: -1 }).attendee_id) {
      setDetailActive(undefined)
    } else {
      setDetailActive(attendee)
    }
  }

  const handleSnackbarOpen = (phrase) => () => setSnackbarOpen(phrase)
  const handleSnackbarClose = (_, reason?) => reason !== 'clickaway' && setSnackbarOpen(undefined)
  const handleModalOpen = () => setAttendeeModalOpen(true)
  const handleModalClose = () => setAttendeeModalOpen(false)
  const handleConfirmModal = (state, attendee?) => () => (
    attendee && setDetailActive(attendee), setConfirmModalOpen(state)
  )
  const handleDeleteModal = (state, attendee?) => () => (
    attendee && setDetailActive(attendee), setDeleteModalOpen(state)
  )

  const handleDelete = (id) => () => {
    setModalLoading(true)
    props.deleteAttendee(id, () => {
      setDetailActive(undefined)
      setModalLoading(false)
      setDeleteModalOpen(false)
    })
  }
  const handleAddConfirmedAttendee = (id) => setConfirmedAttendees((old) => old.concat([id]))

  const attendeeTable =
    props.attendees.length !== 0 ? (
      <Table size='small' className='attendee-table'>
        <TableHead>
          <TableRow>
            <TableCell className='table-cell'>First Name</TableCell>
            <TableCell className='table-cell'>Last Name</TableCell>
            <TableCell className='table-cell'>Dietary Requirements</TableCell>
            <TableCell className='table-cell'>Travel</TableCell>
            <TableCell className='table-cell'>Link</TableCell>
            <TableCell className='table-cell'>Confirmed</TableCell>
            <TableCell className='table-cell'>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.attendees.map((attendee, index) => (
            <TableRow key={attendee.attendee_id}>
              <TableCell className='table-cell'>{attendee.fname}</TableCell>
              <TableCell className='table-cell'>{attendee.sname} </TableCell>
              <TableCell className='table-cell'>{attendee.diet || 'N/A'}</TableCell>
              <TableCell className='table-cell'>
                <IconButton
                  onClick={setAttendee(attendee)}
                  color={
                    (detailActive || { attendee_id: -1 }).attendee_id === attendee.attendee_id ? 'primary' : 'default'
                  }
                >
                  {attendee.transport !== null ? <AirplanemodeActiveIcon /> : <AddIcon />}
                </IconButton>
              </TableCell>
              <TableCell>
                <Tooltip title={`Get attendee's unique link`}>
                  <CopyToClipboard text={'http://dash-web-19.herokuapp.com/completeform/' + attendee.form_id}>
                    <IconButton
                      onClick={handleSnackbarOpen(`Link for ${attendee.fname} ${attendee.sname} copied to clipboard!`)}
                    >
                      <LinkIcon />
                    </IconButton>
                  </CopyToClipboard>
                </Tooltip>
              </TableCell>
              <TableCell>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {attendee.confirmed || confirmedAttendees.includes(attendee.attendee_id) ? (
                    <Tooltip title='Attendee is confirmed!'>
                      <CheckIcon color='primary' style={{ padding: '12px' }} />
                    </Tooltip>
                  ) : (
                    <Tooltip title='Attendee is not confirmed'>
                      <IconButton onClick={handleConfirmModal(true, attendee)}>
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Tooltip title='Delete attendee'>
                  <IconButton onClick={handleDeleteModal(true, attendee)}>
                    <RemoveCircleIcon />
                  </IconButton>
                </Tooltip>
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
      <AddAttendee add={props.addAttendee} open={attendeeModalOpen} onClose={handleModalClose} id={props.event_id} />
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
            name={detailActive ? detailActive.fname + ' ' + detailActive.sname : 'ERROR'}
            transport={detailActive.transport}
            confirmed={detailActive.confirmed}
            confirm={handleConfirmModal(true)}
            delete={handleDeleteModal(true)}
            form_id={detailActive.form_id}
            attendeeId={detailActive.attendee_id}
            onPropsUpdate={props.onPropsUpdate}
          />
        )}
      </ReactCSSTransitionGroup>
      <ConfirmDialog
        title='Confirm attendee'
        content={`Confirm attendee ${
          detailActive ? detailActive.fname + ' ' + detailActive.sname : 'ERROR'
        }'s attendance`}
        open={confirmModalOpen}
        confirm={{
          text: 'Confirm',
          action: () => {
            setModalLoading(true)
            const url = DASH_API + '/confirmAttendee'
            const body = {
              attendee_id: detailActive ? detailActive.attendee_id : -1,
            }
            fetch(url, {
              method: 'POST',
              headers: {
                ...authHeader(),
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(body),
            })
              .then((res) => res.json())
              .then((res) => {
                setModalLoading(false)
                if (res.success) {
                  handleAddConfirmedAttendee(detailActive ? detailActive.attendee_id : -1)
                  setConfirmModalOpen(false)
                }
              })
              .catch((err) => {
                setModalLoading(false)
              })
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
        content={`Delete attendee ${
          detailActive ? detailActive.fname + ' ' + detailActive.sname : 'ERROR'
        } and their associated details`}
        open={deleteModalOpen}
        confirm={{
          text: 'Delete',
          action: handleDelete((detailActive || { attendee_id: -1 }).attendee_id),
        }}
        alt={{
          text: 'Cancel',
          action: handleDeleteModal(false),
        }}
        loading={modalLoading}
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen !== undefined}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id='message-id'>{snackbarOpen}</span>}
        action={[
          <IconButton onClick={handleSnackbarClose} key='close'>
            <CloseIcon style={{ color: '#ffffff' }} />
          </IconButton>,
        ]}
        style={{ position: 'fixed', left: 'calc(100vw + 24px)' }}
      />
    </div>
  )
}

interface AttendeesTabProps {
  event_id: number
  attendees: Attendee[]
  deleteAttendee: (id: number, callback: () => void) => void
  addAttendee: (x: Attendee) => void
  onPropsUpdate: () => void
}

export default AttendeesTab
