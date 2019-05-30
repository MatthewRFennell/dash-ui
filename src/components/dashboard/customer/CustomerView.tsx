import * as React from 'react'

import Typography from '@material-ui/core/Typography'
import { History } from 'history'
import EventCard, { EventCardProps } from '../Card'
import './CustomerView.scss'

// tslint:disable-next-line:no-var-requires
const placeholderImage = require('../../../../assets/png/placeholder.jpg')

const NUM_COLS = 2

interface EventDetails {
  id: number
  name: string
  image: string
  date: Date
  blurb: string
}

const placeholderCards: EventDetails[] = [
  {
    id: 0,
    name: 'Hello',
    image: placeholderImage,
    date: new Date(2019, 6, 1),
    blurb: 'Try-hard fingerstache tousled beard drinking vinegar artisan gluten-free tumblr...',
  },
  {
    id: 0,
    name: 'World',
    image: placeholderImage,
    date: new Date(2019, 6, 2),
    blurb: 'Neutra dreamcatcher paleo plaid you probably haven\'t heard of them franzen. ...',
  },
  {
    id: 0,
    name: 'Caring',
    image: placeholderImage,
    date: new Date(2019, 6, 1),
    blurb: 'Meditation chicharrones green juice, yr vexillologist chia deep v semiotics craft ...',
  },
  {
    id: 0,
    name: 'Is',
    image: placeholderImage,
    date: new Date(2019, 6, 2),
    blurb: 'beer shoreditch yuccie gochujang edison bulb. Poke YOLO bespoke, chillwave ...',
  },
  {
    id: 0,
    name: 'Sharing',
    image: placeholderImage,
    date: new Date(2019, 6, 1),
    blurb: 'polaroid austin tote bag echo park lyft everyday carry twee sartorial. Snackwave  ...',
  },
  {
    id: 0,
    name: 'Carebears',
    image: placeholderImage,
    date: new Date(2019, 6, 2),
    blurb: 'fanny pack semiotics prism, kickstarter authentic gastropub typewriter pok pok ...',
  },
]

const CustomerView: React.FunctionComponent<CustomerViewProps> = (props: CustomerViewProps) => {
  const [events, setEvents]: [
    EventDetails[],
    React.Dispatch<React.SetStateAction<EventDetails[]>>
  ] = React.useState(placeholderCards)
  const eventCards = events.map((event, index) => (
    <EventCard {...event} action={props.setActiveEvent(event.id)} key={index} />
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
