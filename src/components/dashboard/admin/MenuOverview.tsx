import * as React from 'react'
import { connect } from 'react-redux'
import fetchProtected from '../../../api/protected'
import { Menu } from '../../../typings/BackendTypes'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import WordArt from 'react-wordart'

import MenuModal from '../customer/Tabs/MenuModal'
import './AdminView.scss'
import './UserCard.scss'

const MenuOverview = (props) => {
  const [menus, setMenus] = React.useState<Menu[]>([])
  const [modalOpen, setModalOpen] = React.useState<boolean>(false)
  const [modalContent, setModalContent] = React.useState<Menu>(undefined)
  const [modalName, setModalName] = React.useState<string>('')
  const wordartChoices = [
    'rainbow',
    'blues',
    'superhero',
    'radial',
    'tilt',
    'purple',
    'horizon',
    'italicOutline',
    'slate',
  ]
  const wordArtStyle = wordartChoices[Math.floor(Math.random() * wordartChoices.length)]

  React.useEffect(() => {
    fetchProtected(DASH_API + '/menu', null, null, 'GET', (res) => {
      if (res.success) {
        setMenus(res.menus.sort((a: Menu, b: Menu) => a.caterer.localeCompare(b.caterer)))
      } else {
        console.log('Failed to load menus')
      }
    })
  }, [])

  const handleModalOpen = (state) => () => setModalOpen(state)

  const viewMenu = (menu: Menu) => () => {
    setModalOpen(true)
    setModalContent(menu)
    setModalName(name)
  }

  const editMenu = (menu: Menu) => (event: React.MouseEvent) => {
    event.stopPropagation()
    props.move(menu)()
    console.log('Edit', menu)
  }

  const menuCards = menus.map((m, i) => (
    <Card className='user-card' key={i}>
      {props.vaporwave && (
        <div className='window-title-bar'>
          {m.caterer}
          <button className='close-button' onClick={viewMenu(m)}>
            <div className='maximize'>🗖</div>
          </button>
        </div>
      )}
      <CardContent className='user-content' style={{ alignItems: 'flex-end' }}>
        <CardActionArea className='user-details' onClick={viewMenu(m)}>
          <Typography className='user-title'>{m.caterer}</Typography>
          <Typography className='user-subtitle'>{m.courses.map((c) => c.name).join(' - ')}</Typography>
        </CardActionArea>
        <CardActions>
          <Button variant='outlined' color='primary' onClick={editMenu(m)} style={{ fontWeight: 'bold' }}>
            <EditIcon style={{ marginRight: '10px' }} /> Edit
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  ))

  return (
    <div className='content-wrapper'>
      {props.vaporwave ? (
        <div style={{ margin: '30px', textAlign: 'center' }}>
          <WordArt text='Menus' theme={wordArtStyle} fontSize={48} />
        </div>
      ) : (
        <Typography className='headline'>Menus</Typography>
      )}
      <div className='user-div'>
        <div className='user-list'>{menuCards}</div>
      </div>
      <MenuModal
        open={modalOpen}
        onClose={handleModalOpen(false)}
        name={modalName}
        menu={modalContent}
        forItinerary={false}
      />
    </div>
  )
}

const mapStateToProps = ({ meme }) => ({ vaporwave: meme.vaporwave })

export default connect(mapStateToProps)(MenuOverview)
