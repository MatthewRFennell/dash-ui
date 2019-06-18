import * as React from 'react'

import Typography from '@material-ui/core/Typography'
import { History } from 'history'
import { connect } from 'react-redux'
import WordArt from 'react-wordart'
import { loadEvents } from '../../..//redux/actions/eventActions'
import fetchProtected from '../../../api/protected'
import { EventRedued } from '../../../typings/BackendTypes'
import EventCard from '../Card'
import './CustomerView.scss'

const NUM_COLS = 2

const CustomerView: React.FunctionComponent<CustomerViewProps> = (props: CustomerViewProps) => {
  const fetchEvents = () => {
    fetchProtected(DASH_API + '/events', null, null, 'GET', (res) => {
      props.onReceiveEvents(res.events)
      setTimeout(fetchEvents, 500)
    })
  }

  React.useEffect(() => {
    fetchProtected(DASH_API + '/events', null, null, 'GET', (res) => {
      props.onReceiveEvents(res.events)
      props.onLoadComplete()
      setTimeout(props.onLoadComplete, 750)
      fetchEvents()
    })
  }, [])

  const wordartChoices = [
    'rainbow',
    'blues',
    'superhero',
    'radial',
    'tilt',
    'purple',
    'horizon',
    'italicOutline',
    'slate',
  ]
  const wordArtStyle = wordartChoices[Math.floor(Math.random() * wordartChoices.length)]

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
      {props.vaporwave ? (
        <div style={{ textAlign: 'center', margin: '30px' }}>
          <WordArt text='Your Upcoming Events!' theme={wordArtStyle} fontSize={48} />
        </div>
      ) : (
        <Typography className='headline'>Your Upcoming Events</Typography>
      )}
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
  vaporwave: boolean
  setActiveEvent: (id?: number) => () => void
  onReceiveEvents: (x: any) => void
  onLoadComplete: () => void
  events: EventRedued[]
}

const mapStateToProps = (state) => {
  return {
    events: state.events.events,
    vaporwave: state.meme.vaporwave,
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
