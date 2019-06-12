import * as React from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'

import { Paper } from '@material-ui/core'
import fetchProtected from '../../../api/protected'
import { Menu } from '../../../typings/BackendTypes'
import './Modal.scss'

const SelectMenu: React.FunctionComponent<SelectMenuProps> = (props) => {
  const [menus, setMenus] = React.useState<Menu[]>([])
  const [selected, setSelected] = React.useState<number>(-1)

  const disabled = selected < 0 || selected >= menus.length

  const select = (id) => () => {
    if (selected === id) {
      setSelected(-1)
    } else {
      setSelected(id)
    }
  }

  const save = () => {
    fetchProtected(
      DASH_API + '/setmenu',
      null,
      {
        menu_id: menus[selected].menu_id,
        itinerary_id: props.itinerary_id,
      },
      'POST',
      (res) => {
        if (res.success) {
          props.updateMenu(menus[selected])
          props.onClose()
          setSelected(-1)
        } else {
          console.log('Something went wrong')
        }
      },
    )
  }

  React.useEffect(() => {
    fetchProtected(DASH_API + '/menu', null, null, 'GET', (res) => {
      if (res.success) {
        setMenus(res.menus)
      } else {
        console.log('Failed to load menus')
      }
    })
  }, [])

  return (
    <Dialog open={props.open} onClose={props.onClose} className='modal'>
      <DialogTitle>
        <Typography className='modal-title'>Select A Menu</Typography>
      </DialogTitle>
      <DialogContent>
        {menus.map((m, i) => (
          <Paper
            onClick={select(i)}
            key={i}
            className={'modal-paper' + (i === selected ? ' modal-paper-selected' : '')}
          >
            <h3>{m.caterer}</h3>
          </Paper>
        ))}
      </DialogContent>
      <DialogActions>
        <Button disabled={disabled} onClick={save} color='primary'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

interface SelectMenuProps {
  open: boolean
  onClose: () => void
  itinerary_id: number
  updateMenu: (menu: Menu) => void
}

export default SelectMenu
