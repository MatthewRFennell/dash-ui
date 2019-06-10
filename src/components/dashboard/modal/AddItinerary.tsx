import * as React from 'react'

import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Collapse from '@material-ui/core/Collapse'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { DateFormatInput, TimeFormatInput } from 'material-ui-next-pickers'

import authHeader from '../../../api/authHeader'

import './Modal.scss'

const AddItinerary: React.FunctionComponent<AddItineraryProps> = (props) => {
  const [name, setName] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')
  const [startDate, setStartDate] = React.useState<Date>()
  const [startTime, setStartTime] = React.useState<Date>()
  const [useEndTime, setUseEndTime] = React.useState<boolean>(false)
  const [endDate, setEndDate] = React.useState<Date | undefined>()
  const [endTime, setEndTime] = React.useState<Date | undefined>()
  const [lat, setLat] = React.useState<number | undefined>()
  const [lng, setLng] = React.useState<number | undefined>()
  const [errors, setErrors] = React.useState<string[]>([])
  const [submitting, setSubmitting] = React.useState<boolean>(false)
  const [sendError, setSendError] = React.useState<boolean>(false)

  const removeError = (err) => {
    if (errors.includes(err)) {
      setErrors(errors.filter((val) => val !== err))
    }
  }

  const handleChangeName = (event) => (removeError('name'), setName(event.target.value))
  const handleChangeDescription = (event) => (removeError('description'), setDescription(event.target.value))
  const handleChangeStartDate = (newDate) => (removeError('startDate'), setStartDate(newDate))
  const handleChangeStartTime = (newTime) => (removeError('startDate'), setStartTime(newTime))
  const handleChangeUseEndTime = (event) => {
    const { checked } = event.target
    if (checked) {
      if (endDate === null) {
        setEndDate(startDate)
      }
      if (endTime === null) {
        setEndTime(startTime)
      }
    } else {
      removeError('endDate')
    }
    setUseEndTime(checked)
  }
  const handleChangeEndDate = (newDate) => (removeError('endDate'), setEndDate(newDate))
  const handleChangeEndTime = (newTime) => (removeError('endDate'), setEndTime(newTime))
  const handleChangeLatitude = (event) => (removeError('latitude'), setLat(event.target.value))
  const handleChangeLongitude = (event) => (removeError('longitude'), setLng(event.target.value))
  const handleSubmit = () => {
    /* Check for errors */
    const errs = []
    const now = new Date()

    /* Consolidate dates */
    const start =
      startDate && startTime
        ? new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate(),
            startTime.getHours(),
            startTime.getMinutes(),
          )
        : errs.push('startDate')
    const end = useEndTime
      ? endDate && endTime
        ? new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate(),
            endTime.getHours(),
            endTime.getMinutes(),
          )
        : errs.push('endDate')
      : undefined

    if (name === '') {
      errs.push('name')
    }
    if (description === '') {
      errs.push('description')
    }
    if (start && start < now) {
      errs.push('startDate')
    }
    if (useEndTime && (end && end < start)) {
      errs.push('endDate')
    }
    if (lat < -90 || lat > 90) {
      errs.push('latitude')
    }
    if (lng < -180 || lng > 180) {
      errs.push('longitude')
    }
    if (errs.length > 0) {
      setErrors(errs)
      return
    }

    /* No errors, then begin submit */
    setSubmitting(true)
    const body = {
      event_id: props.eventId,
      name,
      description,
      start_date: start,
      end_date: end,
      long: lng,
      lat,
    }
    const url = DASH_API + '/itinerary'
    fetch(url, {
      method: 'POST',
      headers: {
        ...authHeader(),
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setSubmitting(false)
          props.onClose()
          props.onSuccess(res.itinerary)
        } else {
          setSubmitting(false)
          setSendError(true)
        }
      })
  }

  return (
    <Dialog open={props.open} onClose={props.onClose} className='modal'>
      <DialogTitle>
        <Typography className='modal-title'>Add Itinerary Event</Typography>
        <Typography style={{ opacity: 0.54 }}>Fields marked with * are required</Typography>
      </DialogTitle>
      <DialogContent>
        <div className='modal-flex'>
          <div style={{ width: '280px', marginRight: '15px' }}>
            <TextField
              className='modal-form-field'
              color='primary'
              label='Name'
              required={true}
              variant='outlined'
              value={name}
              onChange={handleChangeName}
              fullWidth={true}
              error={errors.includes('name')}
              helperText={errors.includes('name') ? 'Please input a valid name' : 'Itinerary event name'}
            />
            <TextField
              className='modal-form-field'
              color='primary'
              label='Description'
              required={true}
              variant='outlined'
              multiline={true}
              value={description}
              onChange={handleChangeDescription}
              fullWidth={true}
              error={errors.includes('description')}
              helperText={
                errors.includes('description') ? 'Please input a valid description' : 'Itinerary event description'
              }
            />
            <TextField
              className='modal-form-field'
              color='primary'
              label='Latitude'
              variant='outlined'
              value={lat}
              onChange={handleChangeLatitude}
              fullWidth={true}
              type='number'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Typography style={{ fontWeight: 'bold', opacity: 0.54 }}>°N</Typography>
                  </InputAdornment>
                ),
              }}
              error={errors.includes('latitude')}
              helperText={errors.includes('latitude') ? 'Please input a valid latitude' : 'Itinerary event latitude'}
            />
            <TextField
              className='modal-form-field'
              color='primary'
              label='Longitude'
              variant='outlined'
              value={lng}
              onChange={handleChangeLongitude}
              fullWidth={true}
              type='number'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Typography style={{ fontWeight: 'bold', opacity: 0.54 }}>°E</Typography>
                  </InputAdornment>
                ),
              }}
              error={errors.includes('longitude')}
              helperText={errors.includes('longitude') ? 'Please input a valid longitude' : 'Itinerary event longitude'}
            />
          </div>
          <div style={{ width: '280px', marginLeft: '15px' }}>
            <DateFormatInput
              className='modal-form-field'
              error={errors.includes('startDate') ? 'Date is in the past' : undefined}
              name='start-date'
              label='Start Date *'
              variant='outlined'
              value={startDate}
              onChange={handleChangeStartDate}
              fullWidth={true}
            />
            <TimeFormatInput
              className='modal-form-field'
              error={errors.includes('startDate') ? 'Date is in the past' : undefined}
              name='start-time'
              label='Start Time *'
              variant='outlined'
              value={startTime}
              onChange={handleChangeStartTime}
              fullWidth={true}
            />
            <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
              <Checkbox checked={useEndTime} color='primary' onChange={handleChangeUseEndTime} />
              <Typography display='inline' style={{ opacity: 0.54 }}>
                Use an end date
              </Typography>
            </div>
            <Collapse in={useEndTime}>
              <DateFormatInput
                className='modal-form-field'
                error={errors.includes('endDate') ? 'Date is in the past' : undefined}
                name='end-date'
                label='End Date'
                variant='outlined'
                value={endDate}
                onChange={handleChangeEndDate}
                fullWidth={true}
              />
              <TimeFormatInput
                className='modal-form-field'
                error={errors.includes('endDate') ? 'Date is in the past' : undefined}
                name='end-time'
                label='End Time'
                variant='outlined'
                value={endDate}
                onChange={handleChangeEndTime}
                fullWidth={true}
              />
            </Collapse>
          </div>
        </div>
        {sendError && <Typography>Sorry, something went wrong</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} className='modal-button' color='primary' disabled={submitting}>
          Cancel
        </Button>
        <Button
          variant='outlined'
          className='modal-button'
          color='primary'
          onClick={handleSubmit}
          disabled={submitting}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

interface AddItineraryProps {
  open: boolean
  eventId: number
  onClose: () => void
  onSuccess: (deets) => void
}

export default AddItinerary
