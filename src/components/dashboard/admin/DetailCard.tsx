import * as React from 'react'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'
import LinearProgress from '@material-ui/core/LinearProgress'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'

import authHeader from '../../../api/authHeader'
import { Event } from '../../../typings/BackendTypes'
import './DetailCard.scss'

const DetailCard: React.FunctionComponent<DetailCardProps> = (props) => {
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<string>(undefined)
  const [events, setEvents] = React.useState<Event[]>([])
  const loadEvents = () => {
    setLoading(true)
    const url = DASH_API + `/events?account_id=${props.account_id}`
    fetch(url, {
      method: 'GET',
      headers: {
        ...authHeader(),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLoading(false)
        setEvents(res.events)
        setError(undefined)
      })
      .catch((err) => {
        setLoading(false)
        setError('Something went wrong: ' + err.text)
      })
  }
  React.useEffect(loadEvents, [props.account_id, props.refresh])
  const eventList = events.map((event, index) => {
    const date = new Date(event.date)
    return (
      <ListItem key={index}>
        <div>
          <Divider />
          <div>
            <img src={event.image} className='image' />
          </div>
          <div className='details'>
            <Typography className='date'>
              {date.toLocaleDateString()}
              {', '}
              {date.toLocaleTimeString('default', {
                hour: '2-digit',
                minute: '2-digit',
                second: undefined,
              })}
            </Typography>
            <Typography className='event-title'>{event.name}</Typography>
            <Typography className='event-blurb'>{event.blurb}</Typography>
            <Button variant='outlined' color='primary' className='button' onClick={props.onSetEvent(event.event_id)}>
              Edit Details
            </Button>
          </div>
        </div>
      </ListItem>
    )
  })
  const useEllipsis = props.fname.length + props.sname.length > 24
  return (
    <Card className='detail-card'>
      {loading && <LinearProgress />}
      <CardContent>
        <Typography className='pre-title'>Events for</Typography>
        <Typography className='title'>{useEllipsis ? props.fname + '...' : props.fname + ' ' + props.sname}</Typography>
        <Button className='add-event-button' variant='outlined' color='primary' onClick={props.onAddEventClick}>
          Add Event
        </Button>
        {events.length === 0 && !loading && error === undefined && (
          <Typography style={{ opacity: 0.54 }}>No events found</Typography>
        )}
        {error !== undefined && !loading && (
          <div>
            <Typography className='error-text'>{error}</Typography>
            <Button variant='outlined' color='primary' className='button' onClick={loadEvents}>
              Retry
            </Button>
          </div>
        )}
      </CardContent>
      {events.length !== 0 && !loading && <List className='event-list'>{eventList}</List>}
    </Card>
  )
}

interface DetailCardProps {
  account_id: number
  refresh: any
  fname: string
  sname: string
  onAddEventClick: () => void
  onSetEvent: (id: number) => () => void
}

export default DetailCard
