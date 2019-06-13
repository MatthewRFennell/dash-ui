import * as React from 'react'

import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

const MuiGeosuggestion: React.FunctionComponent<MuiGeosuggestionProps> = (props) => {
  return (
    <PlacesAutocomplete value={props.address} onChange={props.onChange} onSelect={props.onSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <TextField
            {...getInputProps({
              placeholder: 'Search places...',
              label: 'Location',
              className: 'location-input',
              variant: 'outlined',
              fullWidth: true,
              helperText: 'Address of location',
            })}
          />
          <Paper style={{ position: 'fixed', zIndex: 9999 }}>
            {suggestions.map((suggestion, index) => {
              console.log(suggestion)
              const className = suggestion.active ? 'suggestion-item-active' : 'suggestion-item'
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' }
              return (
                <MenuItem
                  key={index}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  {suggestion.description}
                </MenuItem>
              )
            })}
          </Paper>
        </div>
      )}
    </PlacesAutocomplete>
  )
}

interface MuiGeosuggestionProps {
  address: string
  onChange: (address) => void
  onSelect: (address) => void
}

export default MuiGeosuggestion
