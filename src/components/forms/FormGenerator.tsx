import Typography from '@material-ui/core/Typography'
import Add from '@material-ui/icons/Add'
import Save from '@material-ui/icons/Save'
import { History } from 'history'
import * as React from 'react'

import { Button, Divider, IconButton, Snackbar } from '@material-ui/core'
import Close from '@material-ui/icons/Close'
import fetchProtected from '../../../src/api/protected'
import { NewDish, NewMenu } from '../../typings/CreationTypes'
import '../frontpage/Login.scss'
import CourseGenerator from './CourseGenerator'
import EditBox from './EditBox'
import './Form.scss'
import MenuThanks from './MenuThanks'

const FormGenerator: React.FunctionComponent<FormGeneratorProps> = (props) => {
  const [menu, setMenu] = React.useState<NewMenu>(props.presetMenu)
  const [snackbarOpen, setSnackbarOpen] = React.useState<boolean>(undefined)
  const [done, setDone] = React.useState<boolean>(false)

  const handleSnackbarOpen = (phrase) => () => setSnackbarOpen(phrase)
  const handleSnackbarClose = (_, reason?) => reason !== 'clickaway' && setSnackbarOpen(undefined)

  const handleAddDish = (index: number) => (dish: NewDish) => {
    setMenu((oldMenu) => ({
      ...oldMenu,
      courses: oldMenu.courses.map((c, i) =>
        i !== index
          ? c
          : {
              name: c.name,
              dishes: c.dishes.concat(dish),
            },
      ),
    }))
  }

  const handleRemoveDish = (courseIndex: number) => (dishIndex: number) => {
    setMenu((oldMenu) => ({
      ...oldMenu,
      courses: oldMenu.courses.map((c, i) =>
        i !== courseIndex
          ? c
          : {
              ...c,
              dishes: c.dishes.filter((d, di) => di !== dishIndex),
            },
      ),
    }))
  }

  const setCourseName = (index) => (name) => {
    setMenu((oldMenu) => ({
      ...oldMenu,
      courses: oldMenu.courses.map((c, i) =>
        i !== index
          ? c
          : {
              name,
              dishes: c.dishes,
            },
      ),
    }))
  }

  const addNewCourse = () => {
    setMenu((oldMenu) => ({
      ...oldMenu,
      courses: oldMenu.courses.concat({
        name: '',
        dishes: [],
      }),
    }))
  }

  const saveMenu = () => {
    if (props.edit) {
      console.log('Choosing edit with put')
      console.log(menu)
      fetchProtected(DASH_API + '/menu', null, menu, 'PUT', (res) => {
        if (res.success) {
          handleSnackbarOpen('Updated successfully')()
        } else {
          handleSnackbarOpen('Update failed')()
        }
      })
    } else {
      fetchProtected(DASH_API + '/menu', null, menu, 'POST', () => {
        setDone(true)
      })
    }
  }

  const updateCaterer = (value) => {
    setMenu((oldMenu) => ({
      ...oldMenu,
      caterer: value,
    }))
  }

  if (done) {
    return <MenuThanks onBack={props.onBack} history={props.history} />
  }

  return (
    <div className='page'>
      <Button
        variant='outlined'
        color='primary'
        onClick={props.onBack}
        style={{ fontWeight: 'bold', top: '30px', right: '30px' }}
        className='chang-blue-font'
        id='back'
      >
        Back
      </Button>
      <Typography style={{ fontSize: '36pt', fontWeight: 'bold' }}>Create a Menu</Typography>
      <Typography className='block-title'>caterer</Typography>
      <EditBox saved={true} preset={menu.caterer} title='Caterer' setValue={updateCaterer} />
      {menu.courses.map((course, index) => (
        <CourseGenerator
          course={course}
          key={index}
          add={handleAddDish(index)}
          setTitle={setCourseName(index)}
          remove={handleRemoveDish(index)}
        />
      ))}
      <Divider style={{ margin: '15px 0 15px 0' }} />
      <Button
        color='primary'
        variant='outlined'
        onClick={addNewCourse}
        style={{ marginRight: '15px', fontWeight: 'bold' }}
      >
        <Add style={{ marginRight: '10px' }} /> Add new course
      </Button>
      <Button color='primary' variant='outlined' onClick={saveMenu} style={{ marginRight: '15px', fontWeight: 'bold' }}>
        <Save style={{ marginRight: '10px' }} /> {props.edit ? 'Update' : 'Save'} Menu
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen !== undefined}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id='message-id'>{snackbarOpen}</span>}
        action={[
          <IconButton onClick={handleSnackbarClose} key='close'>
            <Close style={{ color: '#ffffff' }} />
          </IconButton>,
        ]}
        style={{ position: 'fixed', left: 'calc(100vw + 24px)' }}
      />
    </div>
  )
}

interface FormGeneratorProps {
  history: History
  onBack: () => void
  presetMenu?: NewMenu
  edit: boolean
}

FormGenerator.defaultProps = {
  presetMenu: {
    caterer: 'Example',
    courses: [
      {
        name: 'Starters',
        dishes: [],
      },
    ],
  },
}

export default FormGenerator
