import * as React from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

import { Attendee } from './../../../typings/BackendTypes'

import './Modal.scss'

const ViewMenuChoices: React.FunctionComponent<ViewMenuChoicesProps> = (props) => {
  console.log(props.attendee)
  return (
    <Dialog open={props.open} onClose={props.onClose} className='modal' scroll='body'>
      {props.vaporwave && (
        <div className='window-title-bar'>
          View Menu Choices
          <button className='close-button' onClick={props.onClose}>
            <div className='maximize'>🗙</div>
          </button>
        </div>
      )}
      <DialogTitle>
        <Typography className='modal-title'>
          Menu Choices for {props.attendee.fname} {props.attendee.sname}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {props.attendee.menuchoices.map((val, i) => (
          <div key={i} style={{ marginBottom: '30px' }}>
            <Typography style={{ fontWeight: 'bold', fontSize: '18pt' }}>{val.name}</Typography>
            <Typography style={{ fontSize: '1rem', fontWeight: 300 }}>{val.description}</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Course</TableCell>
                  <TableCell>Dish</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {val.courses.map(({ choice, name }, ii) => (
                  <TableRow key={ii}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{choice.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={props.onClose} style={{ fontWeight: 'bold' }}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

interface ViewMenuChoicesProps {
  attendee: Attendee
  open: boolean
  vaporwave: boolean
  onClose: () => void
}

const mapStateToProps = ({ meme }) => ({ vaporwave: meme.vaporwave })

export default connect(mapStateToProps)(ViewMenuChoices)
