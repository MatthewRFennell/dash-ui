import * as React from 'react'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import PublishIcon from '@material-ui/icons/Publish'
import { DateFormatInput, TimeFormatInput } from 'material-ui-next-pickers'
import authHeader from '../../../api/authHeader'

import { connect } from 'react-redux'
import { addEvent } from '../../../../src/redux/actions/eventActions'
import './Modal.scss'

const CreateEvent: React.FunctionComponent<CreateEventProps> = (props) => {
  const [name, setName] = React.useState<string>('')
  const [desc, setDesc] = React.useState<string>('')
  const [comp, setComp] = React.useState<string>('')
  const [date, setDate] = React.useState<Date>(new Date())
  const [time, setTime] = React.useState<Date>(new Date())
  const [tickets, setTickets] = React.useState<number>(0)
  const [image, setImage] = React.useState<File>(null)
  const [submitting, setSubmitting] = React.useState<boolean>(false)
  const [errors, setErrors] = React.useState<string[]>([])
  const [fetchError, setFetchError] = React.useState<string>('')
  const removeError = (err) => {
    if (errors.includes(err)) {
      setErrors(errors.filter((val) => val !== err))
    }
  }
  const handleChangeName = (event) => (removeError('name'), setName(event.target.value))
  const handleChangeDesc = (event) => (removeError('desc'), setDesc(event.target.value))
  const handleChangeComp = (event) => (removeError('comp'), setComp(event.target.value))
  const handleChangeImage = (event) => (removeError('image'), setImage(event.target.files[0]))
  const handleChangeTickets = (event) => (removeError('tickets'), setTickets(event.target.value))
  const handleChangeTime = (newTime) => (removeError('date'), setTime(newTime))
  const handleChangeDate = (newDate) => (removeError('date'), setDate(newDate))
  const handleSubmit = () => {
    const mergedDate = new Date(date.getFullYear(), date.getMonth(), date.getDay(), time.getHours(), time.getMinutes())
    const allErrors = []
    if (name === '') {
      allErrors.push('name')
    }
    if (desc === '') {
      allErrors.push('desc')
    }
    if (comp === '') {
      allErrors.push('comp')
    }
    if (tickets === 0) {
      allErrors.push('tickets')
    }
    if (image === null) {
      allErrors.push('image')
    }
    const newdate = new Date()
    if (mergedDate < newdate) {
      console.log(mergedDate, newdate)
      allErrors.push('date')
    }
    if (allErrors.length > 0) {
      setErrors(allErrors)
      return
    }
    setSubmitting(true)
    const url = DASH_API + '/event'
    const formData = new FormData()
    formData.append('image', image, image.name)
    formData.append('name', name)
    formData.append('company', comp)
    formData.append('date', mergedDate.toISOString())
    formData.append('blurb', desc)
    formData.append('tickets', tickets.toString())
    fetch(url, {
      method: 'POST',
      headers: {
        ...authHeader(),
        'Access-Control-Allow-Origin': '*',
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        setSubmitting(false)
        if (response.success) {
          console.log('Going to add event', response.event)
          props.onAddEvent(response.event)
          props.onClose()
        }
      })
      .catch((error: Error) => {
        setSubmitting(false)
        setFetchError(error.message)
      })
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      className='modal'
      PaperProps={{
        style: { width: '350px' },
      }}
    >
      <DialogTitle>
        <Typography className='modal-title'>New event</Typography>
      </DialogTitle>
      <DialogContent className='modal-content'>
        <TextField
          fullWidth={true}
          value={name}
          onChange={handleChangeName}
          color='primary'
          variant='outlined'
          label='Name'
          className='modal-form-field'
          error={errors.includes('name')}
          helperText={errors.includes('name') ? 'Please input a name' : ''}
        />
        <TextField
          fullWidth={true}
          multiline={true}
          value={desc}
          onChange={handleChangeDesc}
          color='primary'
          variant='outlined'
          label='Description'
          className='modal-form-field'
          error={errors.includes('desc')}
          helperText={errors.includes('desc') ? 'Please input a description' : ''}
        />
        <TextField
          fullWidth={true}
          value={comp}
          onChange={handleChangeComp}
          color='primary'
          variant='outlined'
          label='Company'
          className='modal-form-field'
          error={errors.includes('name')}
          helperText={errors.includes('name') ? 'Please input a company' : ''}
        />
        <TextField
          label='Number of Tickets'
          type='number'
          variant='outlined'
          onChange={handleChangeTickets}
          className='modal-form-field'
          value={tickets}
          fullWidth={true}
          error={errors.includes('tickets')}
          helperText={errors.includes('tickets') ? 'Please input ticket amount' : ''}
        />
        <input
          accept='image/*'
          id='file-upload'
          multiple={true}
          type='file'
          style={{ display: 'none' }}
          onChange={handleChangeImage}
        />
        <TextField
          fullWidth={true}
          value={image ? image.name : ''}
          color='primary'
          variant='outlined'
          label='Image'
          className='modal-form-field'
          id='image-upload'
          disabled={true}
          error={errors.includes('image')}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <label htmlFor='file-upload'>
                  <IconButton edge='end' aria-label='Upload Image' style={{ margin: 0 }} component='span'>
                    <PublishIcon />
                  </IconButton>
                </label>
              </InputAdornment>
            ),
          }}
          helperText={errors.includes('image') ? 'Please upload an image' : ''}
        />
        <DateFormatInput
          name='date-input'
          value={date}
          onChange={handleChangeDate}
          fullWidth={true}
          variant='outlined'
          label='Date'
          className='modal-form-field'
          error={errors.includes('date') ? 'Date is in the past' : undefined}
        />
        <TimeFormatInput
          name='time-input'
          value={time}
          onChange={handleChangeTime}
          fullWidth={true}
          variant='outlined'
          label='Time'
          className='modal-form-field'
          error={errors.includes('date') ? 'Date is in the past' : undefined}
        />
      </DialogContent>
      <DialogActions>
        <Button
          className='modal-button'
          color='primary'
          disabled={submitting || errors.length > 0}
          onClick={handleSubmit}
          style={{
            width: '84.57px',
            height: '34.5px',
          }}
        >
          {submitting ? <CircularProgress size={15} /> : 'SUBMIT'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

interface CreateEventProps {
  open: boolean
  onClose: () => void
  onAddEvent: (event: any) => void
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddEvent: (event) => dispatch(addEvent(event)),
  }
}

const ConnectedCreateEvent = connect(
  null,
  mapDispatchToProps,
)(CreateEvent)

export { ConnectedCreateEvent as CreateEvent }
