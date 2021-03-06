import * as React from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { Attendee } from '../../../typings/BackendTypes'

import fetchProtected from '../../../../src/api/protected'
import './Modal.scss'

const AddAttendee: React.FunctionComponent<AddAttendeeProps> = (props) => {
  const [fname, setFname] = React.useState<string>('')
  const [sname, setSname] = React.useState<string>('')
  const [dietr, setDietr] = React.useState<string>('')
  const [errors, setErrors] = React.useState<string[]>([])
  const [submitting, setSubmitting] = React.useState<boolean>(false)
  const handleChange = (component) => (event) => {
    if (errors.includes(component)) {
      setErrors(errors.filter((name) => name !== component))
    }
    switch (component) {
      case 'fname':
        return setFname(event.target.value)
      case 'sname':
        return setSname(event.target.value)
      case 'dietr':
        return setDietr(event.target.value)
    }
  }
  const handleSubmit = () => {
    const allErrors: string[] = []
    if (fname === '') {
      allErrors.push('fname')
    }
    if (sname === '') {
      allErrors.push('sname')
    }
    if (allErrors.length > 0) {
      setErrors(allErrors)
      return
    }

    const body = {
      fname,
      sname,
      diet: dietr,
      event_id: props.id,
    }

    setSubmitting(true)
    fetchProtected(DASH_API + '/attendee', null, body, 'POST', (res) => {
      console.log(res)
      setSubmitting(false)
      if (res.success) {
        setFname('')
        setSname('')
        setDietr('')
      }
    })
  }
  const fnameError = errors.includes('fname')
  const snameError = errors.includes('sname')
  return (
    <Dialog open={props.open} onClose={props.onClose} className='modal'>
      {props.vaporwave && (
        <div className='window-title-bar'>
          Add attendee
          <button className='close-button' onClick={props.onClose}>
            <div className='maximize'>🗙</div>
          </button>
        </div>
      )}
      <DialogTitle>
        <Typography className='modal-title'>Add Attendee</Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          variant='outlined'
          fullWidth={true}
          value={fname}
          label='First Name'
          onChange={handleChange('fname')}
          color='primary'
          className='modal-form-field'
          required={true}
          error={fnameError}
          helperText={fnameError ? 'Enter a first name' : ''}
        />
        <TextField
          variant='outlined'
          fullWidth={true}
          value={sname}
          label='Last Name'
          onChange={handleChange('sname')}
          color='primary'
          className='modal-form-field'
          required={true}
          error={snameError}
          helperText={snameError ? 'Enter a last name' : ''}
        />
        <TextField
          variant='outlined'
          fullWidth={true}
          value={dietr}
          label='Dietary Requirements'
          onChange={handleChange('dietr')}
          color='primary'
          className='modal-form-field'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color='primary'>
          Cancel
        </Button>
        <Button
          color='primary'
          variant='outlined'
          onClick={handleSubmit}
          style={{ width: '68.141px', height: '36.5px' }}
          disabled={submitting}
        >
          {submitting ? <CircularProgress size={15} /> : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

interface AddAttendeeProps {
  open: boolean
  onClose: () => void
  vaporwave: boolean
  id: number
}

const mapStateToProps = ({ meme }) => ({ vaporwave: meme.vaporwave })

export default connect(mapStateToProps)(AddAttendee)
