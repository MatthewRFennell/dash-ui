import * as React from 'react'

import TextField from '@material-ui/core/TextField'

const InputField : React.FunctionComponent<InputFieldProps> = (props) => {

    const update = (e) => {
        props.change(e.target.value)
    }

    return (
        <div>
            <TextField
                id={props.label + "Input"}
                label={props.label}
                margin="normal"
                variant="outlined"
                type={props.type}
                required={props.req}
                onChange={update}
            />
        </div>
    )

}

export interface InputFieldProps { label: string,
                                   type?: string, 
                                   req?: boolean,
                                   change?: React.Dispatch<React.SetStateAction<string>>}

InputField.defaultProps = {
    type: "text",
    req: false,
    change: () => console.log("Yeet")
}

export default InputField;