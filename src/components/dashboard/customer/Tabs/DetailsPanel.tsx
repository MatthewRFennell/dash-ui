import * as React from 'react'
import { connect } from 'react-redux'

import { IconButton } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/icons/Link'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Transport } from '../../../../typings/BackendTypes'
import TransportSection from './TransportSection'

import '../../../forms/Form.scss'

const DetailsPanel: React.FunctionComponent<DetailsPanelProps> = (props) => {
  const link = 'http://dash-web-19.herokuapp.com/completeform/' + props.form_id
  return (
    <div className='event-page-aux-wrapper'>
      <div className='event-page-aux-paper'>
        <TransportSection
          {...props.transport}
          attendeeId={props.attendeeId}
          onPropsUpdate={props.onPropsUpdate}
          create={props.transport === null}
        />
      </div>
    </div>
  )
}

interface DetailsPanelProps {
  name: string
  form_id: string
  transport?: Transport
  admin: boolean
  confirmed: boolean
  attendeeId: any
  confirm: () => void
  delete: () => void
  onPropsUpdate: (attendeeId, transport) => void
}

const mapStateToProps = ({ user }) => ({ admin: user.admin })

export default connect(mapStateToProps)(DetailsPanel)
