import * as React from 'react'

import Typography from '@material-ui/core/Typography'
import { History } from 'history'
import { connect } from 'react-redux'
import { loadEvents } from '../../../../src/redux/actions/eventActions'
import fetchProtected from '../../../api/protected'
import EventCard, { EventCardProps } from '../Card'
import './CustomerView.scss'

const NUM_COLS = 2

interface EventDetails {
  event_id: number
  name: string
  image: string
  date: Date
  blurb: string
}

const CustomerView: React.FunctionComponent<CustomerViewProps> = (props: CustomerViewProps) => {
  const [raised, setRaised] = React.useState<boolean>(false)
  console.log(props.events)

  React.useEffect(() => {
    fetchProtected(DASH_API + '/events', null, null, 'GET', (res) => {
      props.onReceiveEvents(res.events)
      setTimeout(props.onLoadComplete, 750)
    })
  }, [])

  const eventCards = props.events.map((event, index) => (
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
      <Typography className='headline'>Your New Upcoming Events</Typography>
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
  onReceiveEvents: (x: any) => void
  onLoadComplete: () => void
  events: [EventDetails]
}

const mapStateToProps = (state) => {
  return {
    events: state.events.events,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onReceiveEvents: (events) => dispatch(loadEvents(events)),
  }
}

const ConnectedCustomerView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomerView)

export { ConnectedCustomerView as CustomerView }
