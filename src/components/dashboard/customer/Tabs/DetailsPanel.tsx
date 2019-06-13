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
  const [transport, setTransport] = React.useState<any>(props.transport)
  React.useEffect(() => setTransport(props.transport), [props.transport])
  const link = 'http://dash-web-19.herokuapp.com/completeform/' + props.form_id
  return (
    <div className='event-page-aux-wrapper'>
      <div className='event-page-aux-paper'>
        {transport ? (
          <TransportSection {...transport} attendeeId={props.attendeeId} onPropsUpdate={props.onPropsUpdate} />
        ) : (
          'No transport details'
        )}
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
  onPropsUpdate: () => void
}

const mapStateToProps = ({ user }) => ({ admin: user.admin })

export default connect(mapStateToProps)(DetailsPanel)
