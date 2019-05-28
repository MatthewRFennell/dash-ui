import * as React from 'react'

import { History } from 'history'
import EventCard, { EventCardProps } from '../Card'
import '../styles.scss'

// tslint:disable-next-line:no-var-requires
const placeholderImage = require('../../../../assets/png/placeholder.jpg')

interface CustomerViewProps {
  history: History
}

const NUM_COLS = 2

const placeholderCards: EventCardProps[] = [
  {
    name: 'Hello',
    image: placeholderImage,
  },
  {
    name: 'World',
    image: placeholderImage,
  },
]

const CustomerView: React.FunctionComponent<CustomerViewProps> = (props: CustomerViewProps) => {
  const [events, setEvents]: [
    EventCardProps[],
    React.Dispatch<React.SetStateAction<EventCardProps[]>>
  ] = React.useState(placeholderCards)
  const eventCards = events.map((event, index) => <EventCard name={event.name} image={event.image} key={index} />)
  const columns: JSX.Element[][] = []
  for (let i = 0; i < NUM_COLS; i++) {
    columns.push(
      eventCards.filter((_, index) => index % NUM_COLS === i).map((element, index) => <li key={index}>{element}</li>),
    )
  }
  return (
    <div className='customer-cards'>
      {columns.map((col, index) => (
        <ul key={index}>{col}</ul>
      ))}
    </div>
  )
}

export default CustomerView
