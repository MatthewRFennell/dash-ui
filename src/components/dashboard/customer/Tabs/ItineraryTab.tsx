import * as React from 'React'

import { AttendeeDetails, EventFullDetails } from '../EventPage'

const ItineraryTab: React.FunctionComponent<ItineraryTabProps> = () => {
  return <div>Hello World</div>
}

interface ItineraryTabProps extends EventFullDetails {
  backAction: () => void
  deleteAttendee: (x: number) => void
  addAttendee: (x: AttendeeDetails) => void
}

export default ItineraryTab
