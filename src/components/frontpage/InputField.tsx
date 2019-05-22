import * as React from 'react'

import TextField from '@material-ui/core/TextField'

const InputField : React.FunctionComponent<InputFieldProps> = (props) => {
    return (
        <div>
            <TextField
                id={props.label + "Input"}
                label={props.label}
                margin="normal"
                variant="outlined"
                type={props.type}
                required={props.req}
            />
        </div>
    )

}

export interface InputFieldProps { label: string; type?: string, req?: boolean}

InputField.defaultProps = {
    type: "text",
    req: false
}

export default InputField;