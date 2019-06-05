import * as React from 'react'

import { Typography } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Add from '@material-ui/icons/Add'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu'
import { History } from 'history'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox'
import { connect } from 'react-redux'
import { setFormDetails } from '../../../../redux/actions/formActions'

const MapPanel = withScriptjs(
  withGoogleMap((props: any) => {
    console.log(props)
    const markers = props.markers.map(({ lat, long, name, id, description }, index) => (
      <Marker position={{ lat, lng: long }} key={index} label={{ color: 'white', text: String(index + 1) }}>
        {props.focus === id ? (
          <InfoBox
            defaultPosition={new google.maps.LatLng(lat, long)}
            options={{ closeBoxURL: ``, enableEventPropagation: true }}
          >
            <Paper style={{ padding: `12px`, margin: '5px' }} key='paper'>
              <div style={{ fontSize: `16px`, fontFamily: 'Lato', fontWeight: 'bold' }}>{name}</div>
              <div style={{ fontSize: `16px`, fontFamily: 'Lato', fontWeight: 300 }}>{description}</div>
            </Paper>
          </InfoBox>
        ) : (
          undefined
        )}
      </Marker>
    ))
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
  const [focus, setFocus] = React.useState<number>(-1)
  const handleChangeFocus = (id: number) => {
    if (id !== focus) {
      return () => setFocus(id)
    } else {
      return () => setFocus(-1)
    }
  }

  const createMenu = (item) => () => {
    props.createForm(item)
    props.history.push('/form')
  }

  const viewMenu = (item) => () => {
    console.log('Should show menu', item.menu)
  }

  const itineraryTable = (
    <Table>
      <TableHead>
        <TableCell className='table-cell'>Name</TableCell>
        <TableCell className='table-cell'>Time</TableCell>
        <TableCell className='table-cell'>Description</TableCell>
        <TableCell className='table-cell'>Menus</TableCell>
        <TableCell className='table-cell'>Location</TableCell>
      </TableHead>
      <TableBody>
        {props.itinerary.map((item, index) => {
          const date = new Date(item.start_date)
          return (
            <TableRow key={index}>
              <TableCell className='table-cell'>{item.name}</TableCell>
              <TableCell className='table-cell'>
                {date.toLocaleTimeString('default', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: undefined,
                })}
                {' on '}
                {date.toLocaleDateString()}
              </TableCell>
              <TableCell className='table-cell'>{item.description}</TableCell>
              <TableCell className='table-cell'>
                <IconButton onClick={item.menu ? viewMenu(item) : createMenu(item)}>
                  {item.menu ?
                    <RestaurantMenuIcon/>
                    :
                    <Add/>
                  }
                </IconButton>
              </TableCell>
              <TableCell className='table-cell'>
                <IconButton
                  onClick={handleChangeFocus(item.itinerary_id)}
                  color={focus === item.itinerary_id ? 'primary' : 'default'}
                >
                  <LocationOnIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
  const markers: Array<{ lat: number; long: number }> = props.itinerary
    .map(
      ({ lat, long, name, itinerary_id, description }) =>
        lat !== null && long !== null && { lat, long, name, id: itinerary_id, description },
    )
    .filter((entry) => entry)
  return (
    <div className='event-page-view'>
      <div className='event-page-left-panel'>
        <div className='event-page-table'>
          <Typography className='event-page-title'>Itinerary</Typography>
          {itineraryTable}
        </div>
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
            focus={focus}
          />
        )}
      </div>
    </div>
  )
}

interface ItineraryTabProps {
  itinerary: ItineraryDetails[]
  createForm: (x: ItineraryDetails) => void
  history: History
}

export interface ItineraryDetails {
  itinerary_id: number
  name: string
  description: string
  start_date: Date
  end_date?: Date
  long: any
  lat: any
  menu: any
}

const mapDispatchToProps = (dispatch) => {
  return {
    createForm: (itinerary) => dispatch(setFormDetails(itinerary)),
  }
}

const ConnectedItineraryTab = connect(null, mapDispatchToProps)(ItineraryTab)

export {ConnectedItineraryTab as ItineraryTab}
