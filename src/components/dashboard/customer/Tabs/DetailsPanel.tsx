import * as React from 'react'

import { IconButton } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/icons/Link'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Transport } from '../../../../types/BackendTypes'
import TransportSection from './TransportSection'

import '../../../forms/Form.scss'

const DetailsPanel: React.FunctionComponent<DetailsPanelProps> = (props) => {
  const link = 'http://dash-web-19.herokuapp.com/completeform/' + props.form_id

  return (
    <div className='event-page-aux-wrapper'>
      <div className='event-page-aux-paper'>
        <Typography className='event-page-block-title'>Details for</Typography>
        <Typography className='event-page-body'>{props.name}</Typography>
        <div className='event-page-detail'>
          <Typography className='event-page-block-title'>Attendee form link</Typography>
          <Typography className='event-page-body inline'>Copy to clipboard</Typography>
          <CopyToClipboard text={link}>
            <IconButton>
              <Link />
            </IconButton>
          </CopyToClipboard>
        </div>
        {props.transport && <TransportSection {...props.transport} />}
        <div className='event-page-detail'>
          <Typography className='event-page-block-title'>Attendee Actions</Typography>
          {/*<Button variant='outlined' color='primary' className='action-button' onClick={props.confirm}>
            Confirm
  </Button>*/}
          <Button color='primary' className='action-button' onClick={props.delete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

interface DetailsPanelProps {
  name: string
  form_id: string
  transport?: Transport
  confirm: () => void
  delete: () => void
}

export default DetailsPanel
