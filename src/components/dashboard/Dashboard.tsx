import * as React from 'react'

import { History } from 'history'
import { Header } from '../common/Header'
import CustomerView from './customer/CustomerView'
import EventPage, { EventFullDetails } from './customer/EventPage'
import fetchProtected from '../../../src/api/protected';

// tslint:disable-next-line:no-var-requires
const placeholderImage = require('../../../assets/png/placeholder.jpg')

const Dashboard: React.FunctionComponent<DashboardProps> = (props: DashboardProps) => {
  const [openEvent, setOpenEvent]: [
    EventFullDetails | undefined,
    React.Dispatch<EventFullDetails | undefined>
  ] = React.useState(undefined)

  const handleSetEvent = (id?: number) => () => {
    console.log("Set event", id)
    if (id !== undefined) {
      /* Fetch from endpoint */
      console.log("Fetching", `/api/fullevent?id=${id}`)
      fetchProtected(`/api/fullevent?id=${id}`, null, null, 'GET', (res) => {
        console.log(res)
        console.log({
          ...res.events,
          attendees: res.attendees,
          transport: res.transport
        })
        setOpenEvent({
          ...res.events,
          attendees: res.attendees,
          transport: res.transport
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
