import * as React from 'react'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu'

import { History } from 'history'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox'
import { connect } from 'react-redux'
import { Itinerary, Menu } from '../../../../typings/BackendTypes'

import AddItinerary from '../../modal/AddItinerary'
import SelectMenu from '../../modal/SelectMenu'
import MenuModal from './MenuModal'

const url = `https://maps.googleapis.com/maps/api/js?key=${GMAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`

const MapPanel = withGoogleMap((props: any) => {
  const [bounds, setBounds] = React.useState<google.maps.LatLngBounds>(
    (console.log('new call'), new google.maps.LatLngBounds()),
  )
  const centerFocus = props.markers.filter(({ id }) => id === props.focus)[0]
  const markers = props.markers.map(({ lat, long, name, id, description, index }) => (
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
  React.useEffect(() => {
    console.log('effect call')
    props.markers.forEach(({ lat, long }) => {
      bounds.extend({ lat, lng: long })
    })
  }, [])
  const center = { lat: markerSum.lat / markers.length, long: markerSum.long / markers.length }
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: center.lat, lng: center.long }}
      zoom={centerFocus ? 14 : 8}
      center={centerFocus ? { lat: centerFocus.lat, lng: centerFocus.long } : { lat: center.lat, lng: center.long }}
      ref={(map) => {
        if (map) {
          if (!centerFocus) {
            map.fitBounds(bounds)
          }
        }
      }}
    >
      {props.isMarkerShown && markers}
    </GoogleMap>
  )
})

const ItineraryTab: React.FunctionComponent<ItineraryTabProps> = (props) => {
  const [focus, setFocus] = React.useState<number>((console.log('new itinerary'), -1))
  const [modalOpen, setModalOpen] = React.useState<boolean>(false)
  const [modalContent, setModalContent] = React.useState<Menu>(undefined)
  const [modalName, setModalName] = React.useState<string>('')
  const [selectModalOpen, setSelectModalOpen] = React.useState({
    open: false,
    itinerary_id: -1,
  })
  const [addItineraryOpen, setAddItineraryOpen] = React.useState<boolean>(false)

  const itinerary = props.itinerary.sort((eventA, eventB) =>
    eventA.start_date < eventB.start_date ? -1 : eventA.start_date > eventB.start_date ? 1 : 0,
  )

  const handleChangeFocus = (id: number) => {
    if (id !== focus) {
      return () => setFocus(id)
    } else {
      return () => setFocus(-1)
    }
  }

  const handleSelectClose = () => {
    setSelectModalOpen({
      open: false,
      itinerary_id: -1,
    })
  }

  const updateMenu = (menu: Menu) => {
    props.updateMenu(menu, selectModalOpen.itinerary_id)
  }

  const handleModalOpen = (state) => () => setModalOpen(state)
  const handleAddItineraryOpen = (state) => () => setAddItineraryOpen(state)

  const createMenu = (id: number) => () => {
    setSelectModalOpen({
      open: true,
      itinerary_id: id,
    })
  }

  const viewMenu = (item: Itinerary) => () => {
    setModalOpen(true)
    setModalContent(item.menu)
    setModalName(item.name)
  }

  const itineraryTable = (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className='table-cell' />
          <TableCell className='table-cell'>Name</TableCell>
          <TableCell className='table-cell'>Time</TableCell>
          <TableCell className='table-cell'>Description</TableCell>
          <TableCell className='table-cell'>Menus</TableCell>
          <TableCell className='table-cell'>Location</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {itinerary.map((item, index) => {
          const date = new Date(item.start_date)
          return (
            <TableRow key={index}>
              <TableCell className='table-cell'>{index + 1}</TableCell>
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
                {(props.admin || item.menu) && (
                  <IconButton onClick={item.menu ? viewMenu(item) : createMenu(item.itinerary_id)}>
                    {item.menu ? <RestaurantMenuIcon /> : <AddIcon />}
                  </IconButton>
                )}
              </TableCell>
              <TableCell className='table-cell'>
                <IconButton
                  onClick={handleChangeFocus(item.itinerary_id)}
                  color={focus === item.itinerary_id ? 'primary' : 'default'}
                  disabled={item.lat === null || item.long === null}
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
  const markers = itinerary
    .map(
      ({ lat, long, name, itinerary_id, description }, index) =>
        lat !== null && long !== null && { lat, long, name, id: itinerary_id, description, index },
    )
    .filter((entry) => entry)
  return (
    <div className='event-page-view'>
      <div className='event-page-left-panel' style={{ overflowY: 'auto', height: 'calc(100vh - 96px)' }}>
        <div className='event-page-table'>
          <Typography className='event-page-title'>Itinerary</Typography>
          {itineraryTable}
          <Button
            variant='outlined'
            color='primary'
            style={{ marginTop: '15px', fontWeight: 'bold' }}
            onClick={handleAddItineraryOpen(true)}
          >
            <AddIcon className='add-icon' style={{ marginRight: '10px' }} />
            Add Itinerary Event
          </Button>
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
            lat={itinerary[0] ? itinerary[0].lat || 0 : 0}
            long={itinerary[0] ? itinerary[0].long || 0 : 0}
            markers={markers}
            focus={focus}
          />
        )}
      </div>
      <MenuModal open={modalOpen} onClose={handleModalOpen(false)} name={modalName} menu={modalContent} />
      <SelectMenu
        open={selectModalOpen.open}
        onClose={handleSelectClose}
        itinerary_id={selectModalOpen.itinerary_id}
        updateMenu={updateMenu}
      />
      <AddItinerary open={addItineraryOpen} eventId={props.eventId} onClose={handleAddItineraryOpen(false)} />
    </div>
  )
}

interface ItineraryTabProps {
  itinerary: Itinerary[]
  eventId: number
  history: History
  updateMenu: (m: Menu, id: number) => void
  admin: boolean
}

const mapStateToProps = (state) => {
  return {
    admin: state.user.admin,
  }
}

const ConnectedItineraryTab = connect(mapStateToProps)(ItineraryTab)

export { ConnectedItineraryTab as ItineraryTab }
