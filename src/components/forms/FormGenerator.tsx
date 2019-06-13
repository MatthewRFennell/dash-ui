import Add from '@material-ui/icons/Add'
import Save from '@material-ui/icons/Save'
import { History } from 'history'
import * as React from 'react'

import { Button, IconButton, Snackbar } from '@material-ui/core'
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
    }),

    )
  }

  const handleRemoveDish = (courseIndex: number) => (dishIndex: number) => {
    setMenu((oldMenu) => ({
      ...oldMenu,
      courses: oldMenu.courses.map((c, i) => (i !== courseIndex) ? c : {
        ...c,
        dishes: c.dishes.filter((d, di) => di !== dishIndex),
      }),
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
        <Button variant='outlined' color='primary' onClick={props.onBack} className='chang-blue-font' id='back'>
          Back
        </Button>
        <h1 className='form-header'>Create a Menu</h1>
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
        <div className='addCourse'>
          <h2 className='inline'>Add new Course</h2>
          <IconButton onClick={addNewCourse}>
            <Add />
          </IconButton>
        </div>
        <div className='addCourse'>
        <h2 className='inline'>{props.edit ? 'Update' : 'Save'} Menu</h2>
          <IconButton onClick={saveMenu}>
            <Save />
          </IconButton>
        </div>
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
