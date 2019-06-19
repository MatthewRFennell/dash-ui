import * as React from 'react'
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Snackbar from '@material-ui/core/Snackbar'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import LinkIcon from '@material-ui/icons/Link'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircleOutline'

import { CopyToClipboard } from 'react-copy-to-clipboard'

import authHeader from '../../../../api/authHeader'
import { Attendee } from '../../../../typings/BackendTypes'
import AddAttendee from '../../modal/AddAttendee'
import ConfirmDialog from '../../modal/ConfirmDialog'
import DetailsPanel from './DetailsPanel'

const AttendeesTab: React.FunctionComponent<AttendeesTabProps> = (props) => {
  console.log(props)
  const [attendees, setAttendees] = React.useState<Attendee[]>(props.attendees)
  const [attendeeModalOpen, setAttendeeModalOpen] = React.useState<boolean>(false)
  const [confirmModalOpen, setConfirmModalOpen] = React.useState<boolean>(false)
  const [deleteModalOpen, setDeleteModalOpen] = React.useState<boolean>(false)
  const [detailActive, setDetailActive] = React.useState<Attendee>(undefined)
  const [modalLoading, setModalLoading] = React.useState<boolean>(false)
  const [confirmedAttendees, setConfirmedAttendees] = React.useState<number[]>([])
  const [snackbarOpen, setSnackbarOpen] = React.useState<string>(undefined)
  const [detailOpen, setDetailOpen] = React.useState<boolean>(false)
  const [sortBy, setSortBy] = React.useState<'fname' | 'sname'>('fname')
  const [sortDir, setSortDir] = React.useState<'up' | 'down'>('up')
  const handleToggleDir = () => setSortDir((val) => (val === 'up' ? 'down' : 'up'))
  React.useEffect(() => {
    setAttendees(props.attendees)
  }, [props.attendees])
  const setAttendee = (attendee: Attendee) => () => {
    if (attendee.attendee_id === (detailActive || { attendee_id: -1 }).attendee_id) {
      if (detailOpen) {
        setDetailOpen(false)
        setDetailActive(undefined)
      } else {
        setDetailOpen(true)
      }
    } else {
      setDetailOpen(true)
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
  const handleTransportUpdate = (attendeeId, transport) => {
    const newAttendees = attendees.concat([])
    for (const attendee of newAttendees) {
      if (attendee.attendee_id === attendeeId) {
        attendee.transport = transport
        break
      }
    }
    setAttendees(newAttendees)
  }
  const handleDelete = (id) => () => {
    setModalLoading(true)
    props.deleteAttendee(id, () => {
      setDetailActive(undefined)
      setModalLoading(false)
      setDeleteModalOpen(false)
    })
  }
  const handleAddConfirmedAttendee = (id) => setConfirmedAttendees((old) => old.concat([id]))
  const handleSortBy = (event) => setSortBy(event.target.value)

  const attendeeTable =
    attendees.length !== 0 ? (
      <Table size='small' className='attendee-table'>
        <TableHead>
          <TableRow>
            <TableCell className='table-cell'>First Name</TableCell>
            <TableCell className='table-cell'>Last Name</TableCell>
            <TableCell className='table-cell'>Dietary Requirements</TableCell>
            <TableCell className='table-cell'>Travel</TableCell>
            <TableCell className='table-cell'>Menu Form Link</TableCell>
            <TableCell className='table-cell'>Confirmed</TableCell>
            <TableCell className='table-cell'>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendees
            .sort((a, b) =>
              sortBy === 'fname'
                ? a.fname.localeCompare(b.fname) * (sortDir === 'up' ? 1 : -1)
                : a.sname.localeCompare(b.sname) * (sortDir === 'up' ? 1 : -1),
            )
            .map((attendee, index) => (
              <TableRow key={attendee.attendee_id}>
                <TableCell className='table-cell'>{attendee.fname}</TableCell>
                <TableCell className='table-cell'>{attendee.sname} </TableCell>
                <TableCell className='table-cell'>{attendee.diet || 'N/A'}</TableCell>
                <TableCell className='table-cell'>
                  <IconButton
                    onClick={setAttendee(attendee)}
                    color={
                      (detailActive || { attendee_id: -1 }).attendee_id === attendee.attendee_id && detailOpen
                        ? 'primary'
                        : 'default'
                    }
                  >
                    {attendee.transport !== null && attendee.transport !== undefined ? (
                      <AirplanemodeActiveIcon />
                    ) : (
                      <AddIcon />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>
                  {attendee.menuscompleted ? (
                    <Tooltip
                      title={
                        attendee.menuchoices.length === 0
                          ? `There are no menus to fill in`
                          : `Attendee has completed their menu choices!`
                      }
                    >
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CheckIcon color='primary' />
                      </div>
                    </Tooltip>
                  ) : (
                    <Tooltip title={`Get attendee's unique link`}>
                      <CopyToClipboard text={'http://dash-web-19.herokuapp.com/completeform/' + attendee.form_id}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <IconButton
                            onClick={handleSnackbarOpen(
                              `Link for ${attendee.fname} ${attendee.sname} copied to clipboard!`,
                            )}
                          >
                            <LinkIcon />
                          </IconButton>
                        </div>
                      </CopyToClipboard>
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {attendee.confirmed || confirmedAttendees.includes(attendee.attendee_id) ? (
                      <Tooltip title='Attendee is confirmed!'>
                        <CheckIcon color='primary' style={{ padding: '12px' }} />
                      </Tooltip>
                    ) : (
                      <Tooltip title='Attendee is not confirmed'>
                        <span>
                          <IconButton onClick={handleConfirmModal(true, attendee)} disabled={!props.admin}>
                            <CloseIcon />
                          </IconButton>
                        </span>
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
          <div className='event-page-title-div'>
            <Typography className='attendee-title'>Attendees</Typography>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '30px' }}>
              Sort by
              <TextField
                select={true}
                onChange={handleSortBy}
                variant='outlined'
                value={sortBy}
                style={{ margin: '15px' }}
              >
                <MenuItem value='fname'>First Name</MenuItem>
                <MenuItem value='sname'>Surname</MenuItem>
              </TextField>
              <IconButton onClick={handleToggleDir}>
                {sortDir === 'up' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
              </IconButton>
            </div>
          </div>
          {attendeeTable}
        </div>
        <Fade in={!detailOpen}>
          <Fab variant='extended' color='primary' className='attendee-fab' onClick={handleModalOpen}>
            <PersonAddIcon className='add-icon' />
            Add Attendee
          </Fab>
        </Fade>
      </div>
      <AddAttendee open={attendeeModalOpen} onClose={handleModalClose} id={props.event_id} />
      <ReactCSSTransitionGroup
        transitionName='horizontal-grow'
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        style={{
          position: 'sticky',
          top: 0,
        }}
      >
        {detailOpen && (
          <DetailsPanel
            name={detailActive ? detailActive.fname + ' ' + detailActive.sname : 'ERROR'}
            transport={detailActive.transport}
            confirmed={detailActive.confirmed}
            confirm={handleConfirmModal(true)}
            delete={handleDeleteModal(true)}
            form_id={detailActive.form_id}
            attendeeId={detailActive.attendee_id}
            onPropsUpdate={handleTransportUpdate}
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
        autoHideDuration={2000}
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
  admin: boolean
  event_id: number
  attendees: Attendee[]
  deleteAttendee: (id: number, callback: () => void) => void
  onPropsUpdate: () => void
}

const mapStateToProps = ({ user }) => ({ admin: user.admin })

export default connect(mapStateToProps)(AttendeesTab)
