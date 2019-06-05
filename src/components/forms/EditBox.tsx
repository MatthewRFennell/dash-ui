import { IconButton, TextField} from '@material-ui/core'
import Edit from '@material-ui/icons/Edit'
import Save from '@material-ui/icons/Save'
import * as React from 'react'

import './Form.scss'

const EditBox = (props) => {

  const [saved, setSaved] = React.useState(false)
  const [value, setValue] = React.useState('')

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const save = () => {
    props.setValue(value)
    setSaved(true)
  }

  const edit = () => {
    setSaved(false)
  }

  return (
    <div>
      {saved ?
      <h2 className='inline'>{value}</h2>
      :
      <TextField
        value={value}
        onChange={handleChange}
        label={props.title}
      />
      }
      <IconButton onClick={saved ? edit : save}>
        {saved ?
          <Edit />
          :
          <Save />
        }
      </IconButton>
    </div>
  )
}

export default EditBox
