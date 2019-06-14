import * as React from 'react'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import { DateFormatInput, TimeFormatInput } from 'material-ui-next-pickers'

import authHeader from '../../../../api/authHeader'
import { Transport } from '../../../../typings/BackendTypes'

const TransportSection: React.FunctionComponent<TransportSectionProps> = (props) => {
  const [editable, setEditable] = React.useState<boolean>(false)
  const [operator, setOperator] = React.useState<string>(props.operator || '')
  const [vesselId, setVesselId] = React.useState<string>(props.vessel_id || '')
  const [durationHours, setDurationHours] = React.useState<number>(Math.floor((props.duration || 0) / 60))
  const [durationMinutes, setDurationMinutes] = React.useState<number>((props.duration || 0) % 60)
  const [departTime, setDepartTime] = React.useState<Date>(props.departTime ? new Date(props.departTime) : new Date())
  const [departFrom, setDepartFrom] = React.useState<string>(props.departFrom || '')
  const [arriveAt, setArriveAt] = React.useState<string>(props.arriveAt || '')
  const [submitting, setSubmitting] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>('')
  console.log({
    create: props.create,
    editable,
    operator,
    vesselId,
    durationHours,
    durationMinutes,
    departTime,
    departFrom,
    arriveAt,
    submitting,
    error,
  })
  const handleChange = (element) => ({ target }) => {
    const { value }: { value: string } = target
    switch (element) {
      case 'operator':
        setOperator(value)
        break
      case 'vesselId':
        setVesselId(value)
        break
      case 'durationHours':
        setDurationHours(Number(value))
        break
      case 'durationMinutes':
        setDurationMinutes(Number(value))
        break
      case 'departFrom':
        setDepartFrom(value)
        break
      case 'arriveAt':
        setArriveAt(value)
        break
      default:
        throw new Error('We have a bad programmer, sorry.')
    }
  }
  const handleEditable = (value) => () => setEditable(value)
  const handleChangeTime = (newTime) => setDepartTime(newTime)
  const resetChanges = () => {
    setEditable(false)
    setOperator(props.operator || '')
    setVesselId(props.vessel_id || '')
    setDurationHours(Math.floor((props.duration || 0) / 60))
    setDurationMinutes((props.duration || 0) % 60)
    setDepartTime(props.departTime ? new Date(props.departTime) : new Date())
    setDepartFrom(props.departFrom || '')
    setArriveAt(props.arriveAt || '')
    setError('')
  }
  const handleSubmit = () => {
    setSubmitting(true)
    const body = {
      attendee_id: props.attendeeId,
      operator,
      vessel_id: vesselId,
      duration: durationHours * 60 + durationMinutes,
      departTime: departTime.toISOString(),
      departFrom,
      arriveAt,
      transport_id: props.transport_id,
    }
    const url = DASH_API + '/transport'
    fetch(url, {
      method: props.create ? 'POST' : 'PUT',
      headers: {
        ...authHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        setSubmitting(false)
        if (res.success) {
          props.onPropsUpdate(props.attendeeId, body)
          setEditable(false)
        } else {
          setError(res.message)
        }
      })
      .catch((err) => {
        setSubmitting(false)
        setError(err.message)
        resetChanges()
      })
  }
  React.useEffect(resetChanges, [props])
  return (
    <div className='event-page-detail'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography className='event-page-block-title'>Transport</Typography>
        <IconButton color={editable ? 'primary' : 'default'} onClick={handleEditable(true)} disabled={editable}>
          <EditIcon />
        </IconButton>
      </div>
      <TextField
        name='operator'
        variant='outlined'
        value={operator}
        label='Operator'
        fullWidth={true}
        margin='normal'
        onChange={handleChange('operator')}
        disabled={!editable}
        InputProps={{
          classes: {
            disabled: 'text-field-disabled',
          },
        }}
      />
      <TextField
        name='vesselId'
        variant='outlined'
        value={vesselId}
        label='Vessel Number'
        fullWidth={true}
        margin='normal'
        onChange={handleChange('vesselId')}
        disabled={!editable}
        InputProps={{
          classes: {
            disabled: 'text-field-disabled',
          },
        }}
      />
      <Typography
        style={{
          color: 'rgba(0, 0, 0, 0.54)',
          marginBottom: '-8px',
        }}
      >
        Duration
      </Typography>
      <div
        style={{
          display: 'flex',
        }}
      >
        <TextField
          name='durationHours'
          variant='outlined'
          value={durationHours}
          label='Hours'
          margin='normal'
          onChange={handleChange('durationHours')}
          disabled={!editable}
          type='number'
          InputProps={{
            classes: {
              disabled: 'text-field-disabled',
            },
          }}
          style={{
            marginRight: '15px',
          }}
        />
        <TextField
          name='durationMinutes'
          variant='outlined'
          value={durationMinutes}
          label='Minutes'
          margin='normal'
          onChange={handleChange('durationMinutes')}
          disabled={!editable}
          type='number'
          InputProps={{
            classes: {
              disabled: 'text-field-disabled',
            },
          }}
        />
      </div>
      <div>
        <div style={{ margin: '16px 0px 8px 0px' }}>
          <DateFormatInput
            name='durationSeconds'
            variant='outlined'
            value={departTime}
            label='Departure Date'
            onChange={handleChangeTime}
            disabled={!editable}
            fullWidth={true}
            InputProps={{
              classes: {
                disabled: 'text-field-disabled',
              },
            }}
          />
        </div>
        <div style={{ margin: '16px 0px 8px 0px' }}>
          <TimeFormatInput
            name='durationSeconds'
            variant='outlined'
            value={departTime}
            label='Departure Time'
            onChange={handleChangeTime}
            disabled={!editable}
            fullWidth={true}
            InputProps={{
              classes: {
                disabled: 'text-field-disabled',
              },
            }}
          />
        </div>
      </div>
      <TextField
        name='departFrom'
        variant='outlined'
        value={departFrom}
        label='Departing From'
        fullWidth={true}
        margin='normal'
        onChange={handleChange('departFrom')}
        disabled={!editable}
        InputProps={{
          classes: {
            disabled: 'text-field-disabled',
          },
        }}
      />
      <TextField
        name='arriveAt'
        variant='outlined'
        value={arriveAt}
        label='Arriving At'
        fullWidth={true}
        margin='normal'
        onChange={handleChange('arriveAt')}
        disabled={!editable}
        InputProps={{
          classes: {
            disabled: 'text-field-disabled',
          },
        }}
      />
      {editable && (
        <div style={{ display: 'flex' }}>
          <Button
            variant='outlined'
            color='primary'
            style={{ marginTop: '10px', fontWeight: 'bold' }}
            disabled={submitting}
            onClick={handleSubmit}
          >
            Save changes
          </Button>
          <Button
            color='primary'
            style={{ marginTop: '10px', marginLeft: '15px', fontWeight: 'bold' }}
            onClick={resetChanges}
            disabled={submitting}
          >
            Cancel
          </Button>
        </div>
      )}
      {error !== '' && <Typography>{error}</Typography>}
    </div>
  )
}

interface TransportSectionProps extends Transport {
  attendeeId: any
  onPropsUpdate: (attendeeId, transport) => void
  create: boolean
}

export default TransportSection
