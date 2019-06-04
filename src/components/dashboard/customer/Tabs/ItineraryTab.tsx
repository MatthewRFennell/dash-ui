import * as React from 'react'

import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'

const MapPanel = withScriptjs(
  withGoogleMap((props: any) => {
    const markers = props.markers.map(({ lat, long }, index) => <Marker position={{ lat, lng: long }} key={index} />)
    const markerSum = props.markers.reduce((a, b) => ({ lat: a.lat + b.lat, long: a.long + b.long }), {
      lat: 0,
      long: 0,
    })
    const center = { lat: markerSum.lat / markers.length, long: markerSum.long / markers.length }
    console.log(center)
    return (
      <GoogleMap defaultZoom={8} defaultCenter={{ lat: center.lat, lng: center.long }}>
        {props.isMarkerShown && markers}
      </GoogleMap>
    )
  }),
)

const url = `https://maps.googleapis.com/maps/api/js?key=${GMAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`

const ItineraryTab: React.FunctionComponent<ItineraryTabProps> = (props) => {
  const markers: Array<{ lat: number; long: number }> = props.itinerary
    .map(({ lat, long }) => lat !== null && long !== null && { lat, long })
    .filter((entry) => entry)
  console.log(markers)
  return (
    <div className='event-page-view'>
      <div className='event-page-left-panel'>
        <div className='event-page-detail'>Hello World</div>
      </div>
      <div className='event-page-mock-panel' />
      <div className='event-page-right-panel' style={{ padding: 0, width: '50vw', overflow: 'hidden' }}>
        {markers.length > 0 && (
          <MapPanel
            isMarkerShown={true}
            googleMapURL={url}
            loadingElement={<div style={{ height: `100vh` }} />}
            containerElement={<div style={{ height: `100vh` }} />}
            mapElement={<div style={{ height: `100vh` }} />}
            lat={props.itinerary[0] ? props.itinerary[0].lat || 0 : 0}
            long={props.itinerary[0] ? props.itinerary[0].long || 0 : 0}
            markers={markers}
          />
        )}
      </div>
    </div>
  )
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
