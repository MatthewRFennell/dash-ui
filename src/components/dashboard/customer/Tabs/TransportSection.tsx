import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import { TransportDetails } from '../EventPage'

const TransportSection = (props: TransportSectionProps) => {
    return (
        <div className='event-page-detail'>
            <Typography className='event-page-block-title'>Transport</Typography>
            <List>
                <ListItem>
                    <div>
                        <Typography className='event-page-block-title'>Operator</Typography>
                        <Typography className='event-page-body'>{props.transport.operator}</Typography>
                    </div>
                </ListItem>
                <ListItem>
                    <div>
                        <Typography className='event-page-block-title'>Vessel Number</Typography>
                        <Typography className='event-page-body'>{props.transport.vessel_id}</Typography>
                    </div>
                </ListItem>
                <ListItem>
                    <div>
                        <Typography className='event-page-block-title'>Duration</Typography>
                        <Typography className='event-page-body'>{props.transport.duration}</Typography>
                    </div>
                </ListItem>
                <ListItem>
                    <div>
                        <Typography className='event-page-block-title'>Departing At</Typography>
                        <Typography className='event-page-body'>
                            {props.transport.departTime.getDay()}/{props.transport.departTime.getMonth()}/
                    {props.transport.departTime.getFullYear()} {props.transport.departTime.getHours()}:
                    {props.transport.departTime.getMinutes()}
                        </Typography>
                    </div>
                </ListItem>
                <ListItem>
                    <div>
                        <Typography className='event-page-block-title'>Departing from</Typography>
                        <Typography className='event-page-body'>{props.transport.departFrom}</Typography>
                    </div>
                </ListItem>
                <ListItem>
                    <div>
                        <Typography className='event-page-block-title'>Arriving at</Typography>
                        <Typography className='event-page-body'>{props.transport.arriveAt}</Typography>
                    </div>
                </ListItem>
            </List>
        </div>
    )
}

interface TransportSectionProps {
    transport: TransportDetails
}

export default TransportSection
