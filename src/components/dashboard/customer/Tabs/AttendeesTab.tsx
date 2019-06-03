import * as React from 'React'

import { AttendeeDetails, EventFullDetails } from '../EventPage'

const AttendeesTab: React.FunctionComponent<AttendeesTabProps> = () => {
  return <div>Hello World</div>
}

interface AttendeesTabProps extends EventFullDetails {
  backAction: () => void
  deleteAttendee: (x: number) => void
  addAttendee: (x: AttendeeDetails) => void
}

export default AttendeesTab
