import * as React from 'react'
import { connect } from 'react-redux'

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
      {props.vaporwave && (
        <div className='window-title-bar'>
          {props.title}
          <button className='close-button' onClick={props.onClose || props.alt.action}>
            <div className='maximize'>🗙</div>
          </button>
        </div>
      )}
      <DialogTitle>
        <Typography className='modal-title'>{props.title}</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography className='modal-body'>{props.content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button color='primary' className='modal-button' onClick={props.alt.action}>
          {props.alt.text}
        </Button>
        <Button
          variant='outlined'
          color='primary'
          className='modal-button'
          onClick={props.confirm.action}
          disabled={props.loading}
        >
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
  loading: boolean
  confirm: ActionLabel
  alt: ActionLabel
  vaporwave: boolean
  onClose?: () => void
}

interface ActionLabel {
  text: string
  action: () => void
}

const mapStateToProps = ({ meme }) => ({ vaporwave: meme.vaporwave })

export default connect(mapStateToProps)(ConfirmDialog)
