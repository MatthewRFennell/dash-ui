import * as React from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import LinkIcon from '@material-ui/icons/Link'

import { Menu } from '../../../../typings/BackendTypes'
import '../../modal/Modal.scss'

const MenuModal: React.FunctionComponent<MenuModalProps> = (props) => {
  const courses = props.menu ? (
    <List>
      {props.menu.courses.map((course, index) => (
        <ListItem key={index}>
          <div style={{ width: '100%' }}>
            <Typography className='modal-block-title'>{course.name}</Typography>
            <Table className='modal-table'>
              <TableHead>
                <TableRow>
                  <TableCell>Dish</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Allergens</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {course.dishes.map((dish, dindex) => (
                  <TableRow key={dindex}>
                    <TableCell>{dish.name}</TableCell>
                    <TableCell>{dish.description}</TableCell>
                    <TableCell>{dish.warnings.join(', ')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ListItem>
      ))}
    </List>
  ) : (
    undefined
  )
  return props.menu ? (
    <Dialog open={props.open} onClose={props.onClose} className='modal'>
      <DialogTitle>
        <Typography className='modal-title'>Menu</Typography>
        <Typography className='modal-subtitle'>for {props.name}</Typography>
      </DialogTitle>
      <DialogContent>
        {props.menu.image ? <img src={props.menu.image} /> : undefined}
        <div className='modal-detail'>
          <Typography className='modal-block-title'>Caterer</Typography>
          <Typography>{props.menu.caterer}</Typography>
        </div>
        <div className='modal-detail'>
          <Typography className='modal-block-title'>Courses</Typography>
          <Typography>{courses}</Typography>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} className='modal-button' color='primary'>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  ) : null
}

interface MenuModalProps {
  name: string
  open: boolean
  onClose: () => void
  menu: Menu
}

export default MenuModal
