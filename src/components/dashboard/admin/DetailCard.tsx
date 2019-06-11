import * as React from 'react'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Divider from '@material-ui/core/Divider'
import LinearProgress from '@material-ui/core/LinearProgress'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'

import fetchProtected from '../../../api/protected'
import { Event } from '../../../typings/BackendTypes'
import './DetailCard.scss'

const DetailCard: React.FunctionComponent<DetailCardProps> = (props) => {
  const [loading, setLoading] = React.useState<boolean>(true)
  const [events, setEvents] = React.useState<Event[]>([])
  React.useEffect(() => {
    setLoading(true)
    fetchProtected(DASH_API + `/events?account_id=${props.account_id}`, null, null, 'GET', (res) => {
      setEvents(res.events)
      setLoading(false)
    })
  }, [props.account_id])

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
          </div>
        </div>
      </ListItem>
    )
  })
  return (
    <Card className='detail-card'>
      {loading && <LinearProgress />}
      <CardContent>
        <Typography className='pre-title'>Events for</Typography>
        <Typography className='title'>{props.fname + ' ' + props.sname}</Typography>
        {events.length === 0 && !loading && <Typography style={{ opacity: 0.54 }}>No events found</Typography>}
      </CardContent>
      {events.length !== 0 && !loading && <List className='event-list'>{eventList}</List>}
    </Card>
  )
}

interface DetailCardProps {
  account_id: number
  fname: string
  sname: string
}

export default DetailCard
