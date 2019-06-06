import * as React from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'

import './Modal.scss'

const ConfirmDialog: React.FunctionComponent<ConfirmDialogProps> = (props) => {
  return (
    <Dialog open={props.open} onClose={props.onClose || props.alt.action} className='modal'>
      <DialogTitle>
        <Typography className='modal-title'>{props.title}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography className='modal-body'>{props.content}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='primary' className='modal-button' onClick={props.alt.action}>
          {props.alt.text}
        </Button>
        <Button variant='outlined' color='primary' className='modal-button' onClick={props.confirm.action}>
          {props.confirm.text}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

interface ConfirmDialogProps {
  title: string
  content: string
  open: boolean
  confirm: ActionLabel
  alt: ActionLabel
  onClose?: () => void
}

interface ActionLabel {
  text: string
  action: () => void
}

export default ConfirmDialog
