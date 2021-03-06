import * as React from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
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
      {props.vaporwave && (
        <div className='window-title-bar'>
          Select a menu
          <button className='close-button' onClick={props.onClose}>
            <div className='maximize'>🗙</div>
          </button>
        </div>
      )}
      <DialogTitle>
        <Typography className='modal-title'>Select A Menu</Typography>
      </DialogTitle>
      <DialogContent>
        {menus.map((m, i) => (
          <Card key={i} style={{ margin: '15px 0 15px 0' }} raised={i === selected}>
            <CardActionArea onClick={select(i)} style={{ padding: '15px' }}>
              <Typography style={{ fontSize: '18pt', fontWeight: 'bold' }}>{m.caterer}</Typography>
            </CardActionArea>
          </Card>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color='primary' style={{ fontWeight: 'bold' }}>
          Cancel
        </Button>
        <Button variant='outlined' disabled={disabled} onClick={save} color='primary' style={{ fontWeight: 'bold' }}>
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
  vaporwave: boolean
  updateMenu: (menu: Menu) => void
}

const mapStateToProps = ({ meme }) => ({ vaporwave: meme.vaporwave })

export default connect(mapStateToProps)(SelectMenu)
