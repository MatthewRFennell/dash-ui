import * as React from 'react'

import { History } from 'history'
import fetchProtected from '../../../src/api/protected'
import { Header } from '../common/Header'
import CustomerView from './customer/CustomerView'
import EventPage, { EventFullDetails } from './customer/EventPage'
// tslint:disable-next-line:no-var-requires
const placeholderImage = require('../../../assets/png/care-bears.jpg')

const Dashboard: React.FunctionComponent<DashboardProps> = (props: DashboardProps) => {
  const [openEvent, setOpenEvent]: [
    EventFullDetails | undefined,
    React.Dispatch<EventFullDetails | undefined>
  ] = React.useState(undefined)

  const handleSetEvent = (id?: number) => () => {
    console.log('Set event', id)
    if (id !== undefined) {
      /* Fetch from endpoint */
      console.log('Fetching', `/api/fullevent?id=${id}`)
      fetchProtected(`${DASH_API}/fullevent?id=${id}`, null, null, 'GET', (res) => {
        setOpenEvent({
          ...res.events,
          image_path: placeholderImage,
          date: new Date(res.events.date),
          attendees: res.attendees,
          transport: res.transport,
        })
      })
    } else {
      setOpenEvent(undefined)
    }
  }

  return (
    <div>
      <Header history={props.history} />
      {openEvent === undefined ? (
        <CustomerView history={props.history} setActiveEvent={handleSetEvent} />
      ) : (
        <EventPage {...openEvent} backAction={handleSetEvent()} />
      )}
    </div>
  )
}

interface DashboardProps {
  history: History
}

export default Dashboard
