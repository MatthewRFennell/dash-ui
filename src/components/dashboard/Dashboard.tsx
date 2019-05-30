import * as React from 'react'

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { History } from 'history'
import { Header } from '../common/Header'
import CustomerView from './customer/CustomerView'
import EventPage, { EventFullDetails } from './customer/EventPage'

import './Dashboard.scss'
import { CreateEvent } from './modal/CreateEvent'

// tslint:disable-next-line:no-var-requires
const placeholderImage = require('../../../assets/png/placeholder.jpg')

const Dashboard: React.FunctionComponent<DashboardProps> = (props: DashboardProps) => {
  const [openEvent, setOpenEvent] = React.useState<EventFullDetails | undefined>(undefined)
  const [modalOpen, setModalOpen] = React.useState<boolean>(false)

  const handleModalOpen = () => setModalOpen(true)
  const handleModalClose = () => setModalOpen(false)

  const handleSetEvent = (id?: number) => () => {
    if (id !== undefined) {
      /* Fetch from endpoint */
      setOpenEvent({
        name: 'Care Bears',
        image: placeholderImage,
        blurb: 'This is a blurb',
        date: new Date(1970, 1, 1),
        type: 'Sharing is Caring',
        numTickets: 10,
        attendees: [
          {
            firstName: 'Bedtime',
            lastName: 'Bear',
          },
        ],
        transport: {
          operator: 'Care Bear Airlines',
          vesselNumber: 'CA0000',
          duration: 12000,
          departTime: new Date(1970, 1, 1),
          departFrom: 'Atlanta',
          arriveAt: 'New Jersey',
        },
      })
    } else {
      setOpenEvent(undefined)
    }
  }

  return (
    <div className='dashboard-view'>
      <Header history={props.history} />
      {openEvent === undefined ? (
        <CustomerView history={props.history} setActiveEvent={handleSetEvent} />
      ) : (
        <EventPage {...openEvent} backAction={handleSetEvent()} />
      )}
      <CreateEvent open={modalOpen} onClose={handleModalClose} />
      <Fab className='dashboard-fab' variant='extended' color='primary' onClick={handleModalOpen}>
        <AddIcon className='dashboard-add-icon' />
        Add event
      </Fab>
    </div>
  )
}

interface DashboardProps {
  history: History
}

export default Dashboard
