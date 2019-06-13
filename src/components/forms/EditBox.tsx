import { IconButton, TextField } from '@material-ui/core'
import Edit from '@material-ui/icons/Edit'
import Save from '@material-ui/icons/Save'
import * as React from 'react'

import './Form.scss'

const EditBox: React.FunctionComponent<EditBoxProps> = (props) => {
  const [saved, setSaved] = React.useState<boolean>(props.saved)
  const [value, setValue] = React.useState<string>(props.preset)

  const handleChange: ChangeEventFunc = (event) => {
    setValue(event.target.value)
  }

  const save = (): void => {
    props.setValue(value)
    setSaved(true)
  }

  const edit = (): void => {
    setSaved(false)
  }

  return (
    <div>
      {saved ? (
        <h2 className='inline'>{value}</h2>
      ) : (
        <TextField value={value} onChange={handleChange} label={props.title} />
      )}
      <IconButton onClick={saved ? edit : save}>{saved ? <Edit /> : <Save />}</IconButton>
    </div>
  )
}

interface EditBoxProps {
  title: string
  setValue: (value: string) => void
  preset?: string
  saved?: boolean
}

EditBox.defaultProps = {
  preset: '',
  saved: false,
}

export default EditBox
