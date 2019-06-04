import * as React from 'react'

const ItineraryTab: React.FunctionComponent<ItineraryTabProps> = () => {
  return <div>Hello World</div>
}

interface ItineraryTabProps {
  itinerary: ItineraryDetails[]
}

export interface ItineraryDetails {
  itinerary_id: number
  name: string
  description: string
  start_date: Date
  end_date?: Date
  long: any
  lat: any
}

export default ItineraryTab
