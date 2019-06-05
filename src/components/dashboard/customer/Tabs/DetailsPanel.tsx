import * as React from 'react'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import TransportSection, { TransportDetails } from './TransportSection'

const DetailsPanel: React.FunctionComponent<DetailsPanelProps> = (props) => {
  console.log('Hello: ' + props)
  return (
    <div className='event-page-aux-wrapper'>
      <div className='event-page-aux-paper'>
        <Typography className='event-page-block-title'>Details for</Typography>
        <Typography className='event-page-body'>{props.name}</Typography>
        {props.transport && <TransportSection {...props.transport} />}
        <div className='event-page-detail'>
          <Typography className='event-page-block-title'>Attendee Actions</Typography>
          <Button variant='outlined' color='primary' className='action-button'>
            Confirm
          </Button>
          <Button color='primary' className='action-button'>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

interface DetailsPanelProps {
  name: string
  transport?: TransportDetails
}

export default DetailsPanel
