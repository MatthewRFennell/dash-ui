import * as React from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import { Transport } from '../../../../typings/BackendTypes'

const TransportSection: React.FunctionComponent<Transport> = (props) => {
  console.log(props)
  return (
    <div className='event-page-detail'>
      <Typography className='event-page-block-title'>Transport</Typography>
      <List>
        <ListItem>
          <div>
            <Typography className='event-page-block-title'>Operator</Typography>
            <Typography className='event-page-body'>{props.operator}</Typography>
          </div>
        </ListItem>
        <ListItem>
          <div>
            <Typography className='event-page-block-title'>Vessel Number</Typography>
            <Typography className='event-page-body'>{props.vessel_id}</Typography>
          </div>
        </ListItem>
        <ListItem>
          <div>
            <Typography className='event-page-block-title'>Duration</Typography>
            <Typography className='event-page-body'>{props.duration}</Typography>
          </div>
        </ListItem>
        <ListItem>
          <div>
            <Typography className='event-page-block-title'>Departing At</Typography>
            <Typography className='event-page-body'>
              {props.departTime.getDay()}/{props.departTime.getMonth()}/{props.departTime.getFullYear()}{' '}
              {props.departTime.getHours()}:{props.departTime.getMinutes()}
            </Typography>
          </div>
        </ListItem>
        <ListItem>
          <div>
            <Typography className='event-page-block-title'>Departing from</Typography>
            <Typography className='event-page-body'>{props.departFrom}</Typography>
          </div>
        </ListItem>
        <ListItem>
          <div>
            <Typography className='event-page-block-title'>Arriving at</Typography>
            <Typography className='event-page-body'>{props.arriveAt}</Typography>
          </div>
        </ListItem>
      </List>
    </div>
  )
}

export default TransportSection
