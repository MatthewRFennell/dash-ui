import * as React from 'react'

import TextField from '@material-ui/core/TextField'

const InputField: React.FunctionComponent<InputFieldProps> = (props) => {
  const update = (e) => {
    props.change(e.target.value)
  }

  return (
    <div>
      <TextField
        id={props.label + 'Input'}
        label={props.label}
        margin='normal'
        variant='outlined'
        error={props.errMsg !== ''}
        type={props.type}
        required={props.req}
        onChange={update}
        helperText={props.errMsg}
        className='medium-box'
      />
    </div>
  )
}

export interface InputFieldProps {
  label: string
  type?: string
  req?: boolean
  change?: React.Dispatch<React.SetStateAction<string>>
  errMsg?: string
}

InputField.defaultProps = {
  type: 'text',
  req: false,
  change: () => null,
  errMsg: '',
}

export default InputField
