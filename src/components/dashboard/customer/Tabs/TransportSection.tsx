import * as React from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { DateFormatInput, TimeFormatInput } from 'material-ui-next-pickers'

import { Transport } from '../../../../typings/BackendTypes'

const TransportSection: React.FunctionComponent<Transport> = (props) => {
  const [editable, setEditable] = React.useState<boolean>(false)
  const [operator, setOperator] = React.useState<string>(props.operator)
  const [vesselId, setVesselId] = React.useState<string>(props.vessel_id)
  const [durationHours, setDurationHours] = React.useState<number>(Math.floor(props.duration / 3600))
  const [durationMinutes, setDurationMinutes] = React.useState<number>(Math.floor((props.duration % 3600) / 60))
  const [durationSeconds, setDurationSeconds] = React.useState<number>(Math.floor(props.duration % 60))
  const [departTime, setDepartTime] = React.useState<Date>(props.departTime)
  const [departFrom, setDepartFrom] = React.useState<string>(props.departFrom)
  const [arriveAt, setArriveAt] = React.useState<string>(props.arriveAt)
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
      case 'durationSeconds':
        setDurationSeconds(Number(value))
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
  const handleChangeTime = (newTime) => setDepartTime(newTime)
  console.log({
    editable,
    operator,
    vesselId,
    durationHours,
    durationMinutes,
    durationSeconds,
    departTime,
    departFrom,
    arriveAt,
  })
  return (
    <div className='event-page-detail'>
      <Typography className='event-page-block-title'>Transport</Typography>
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
            marginRight: '10px',
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
          style={{
            marginRight: '10px',
          }}
        />
        <TextField
          name='durationSeconds'
          variant='outlined'
          value={durationSeconds}
          label='Seconds'
          margin='normal'
          onChange={handleChange('durationSeconds')}
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
    </div>
  )
}

export default TransportSection
