import * as React from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

export const CreateEvent: React.FunctionComponent<CreateEventProps> = (props) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Hello World</DialogTitle>
      <DialogContent>
        Enter Shit Here
      </DialogContent>
      <DialogActions>
        <Button>
          SUBMIT TO YOUR MASTER
        </Button>
      </DialogActions>
    </Dialog>
  )
}

interface CreateEventProps {
  open: boolean
  onClose: () => void
}
