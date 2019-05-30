import * as React from 'react'

import Typography from '@material-ui/core/Typography'
import { History } from 'history'
import EventCard, { EventCardProps } from '../Card'
import './CustomerView.scss'
import fetchProtected from '../../../api/protected';

// tslint:disable-next-line:no-var-requires
const placeholderImage = require('../../../../assets/png/placeholder.jpg')

const NUM_COLS = 2

interface EventDetails {
  event_id: number
  name: string
  image: string
  date: Date
  blurb: string
}

const CustomerView: React.FunctionComponent<CustomerViewProps> = (props: CustomerViewProps) => {
  const [events, setEvents]: [
    EventDetails[],
    React.Dispatch<React.SetStateAction<EventDetails[]>>
  ] = React.useState([])

  React.useEffect(() => {
    fetchProtected('/api/events', null, null, 'GET', (res) => {
      setEvents(res.events)
    })
  }, [])

  const eventCards = events.map((event, index) => (
    <EventCard {...event} action={props.setActiveEvent(event.event_id)} key={index} />
  ))
  const columns: JSX.Element[][] = []
  for (let i = 0; i < NUM_COLS; i++) {
    columns.push(
      eventCards.filter((_, index) => index % NUM_COLS === i).map((element, index) => <li key={index}>{element}</li>),
    )
  }
  return (
    <div className='customer-view'>
      <Typography className='headline'>Your Upcoming Events</Typography>
      <div className='customer-cards'>
        {columns.map((col, index) => (
          <ul key={index}>{col}</ul>
        ))}
      </div>
    </div>
  )
}

interface CustomerViewProps {
  history: History
  setActiveEvent: (id?: number) => () => void
}

export default CustomerView
