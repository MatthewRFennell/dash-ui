import Fab from '@material-ui/core/Fab'
import Add from '@material-ui/icons/Add'
import Edit from '@material-ui/icons/Edit'
import * as React from 'react'
import fetchProtected from '../../../api/protected'
import { Menu } from '../../../typings/BackendTypes'

import { Button, Card, CardActionArea, CardContent, IconButton, Typography } from '@material-ui/core'

import MenuModal from '../customer/Tabs/MenuModal'
import './AdminView.scss'
import './UserCard.scss'

const MenuOverview = (props) => {

    const [menus, setMenus] = React.useState<Menu[]>([])

    const [modalOpen, setModalOpen] = React.useState<boolean>(false)
    const [modalContent, setModalContent] = React.useState<Menu>(undefined)
    const [modalName, setModalName] = React.useState<string>('')

    React.useEffect(() => {
        fetchProtected(DASH_API + '/menu', null, null, 'GET', (res) => {
            if (res.success) {
                setMenus(res.menus)
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
            <CardContent className='user-content'>
                <CardActionArea className='user-details' onClick={viewMenu(m)}>
                    <Typography className='user-title'>{m.caterer}</Typography>
                    <Typography className='user-subtitle'>{m.courses.map((c) => c.name).join(' - ')}</Typography>
                    <div className='edit-container'>
                        <IconButton color='primary' onClick={editMenu(m)}>
                            <Edit />
                        </IconButton>
                    </div>
                </CardActionArea>
            </CardContent>
        </Card>
    ))

    return (
        <div className='content-wrapper'>
            <Typography className='headline'>Menus</Typography>
            <div className='user-div'>
                <div className='user-list'>
                    {menuCards}
                </div>
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

export default MenuOverview
