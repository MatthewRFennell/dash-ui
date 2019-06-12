import Add from '@material-ui/icons/Add'
import Save from '@material-ui/icons/Save'
import { History } from 'history'
import * as React from 'react'
import { Header } from '../common/Header'

import { IconButton } from '@material-ui/core'
import fetchProtected from '../../../src/api/protected'
import { NewCourse, NewDish } from '../../typings/CreationTypes'
import CourseGenerator from './CourseGenerator'
import EditBox from './EditBox'
import './Form.scss'
import MenuThanks from './MenuThanks'

const FormGenerator: React.FunctionComponent<FormGeneratorProps> = (props) => {
  const [menu, setMenu] = React.useState<NewCourse[]>([
    {
      name: 'starters',
      dishes: [],
    },
  ])

  const [done, setDone] = React.useState<boolean>(false)

  const [caterer, setCaterer] = React.useState<string>('')

  const handleAddDish = (index: number) => (dish: NewDish) => {
    setMenu((oldMenu) =>
      oldMenu.map((c, i) =>
        i !== index
          ? c
          : {
              name: c.name,
              dishes: c.dishes.concat(dish),
            },
      ),
    )
  }

  const setCourseName = (index) => (name) => {
    setMenu((oldMenu) =>
      oldMenu.map((c, i) =>
        i !== index
          ? c
          : {
              name,
              dishes: c.dishes,
            },
      ),
    )
  }

  const addNewCourse = () => {
    setMenu((oldMenu) =>
      oldMenu.concat({
        name: '',
        dishes: [],
      }),
    )
  }

  const saveMenu = () => {
    const body = {
      caterer,
      courses: menu,
    }

    fetchProtected(DASH_API + '/menu', null, body, 'POST', () => {
      setDone(true)
    })
  }

  const updateCaterer = (value) => {
    setCaterer(value)
  }

  if (done) {
    return <MenuThanks history={props.history} />
  }

  return (
    <div>
      <div className='page'>
        <h1 className='form-header'>Create a Menu</h1>
        <EditBox title='Caterer' setValue={updateCaterer} />
        {menu.map((course, index) => (
          <CourseGenerator course={course} key={index} add={handleAddDish(index)} setTitle={setCourseName(index)} />
        ))}
        <div className='addCourse'>
          <h2 className='inline'>Add new Course</h2>
          <IconButton onClick={addNewCourse}>
            <Add />
          </IconButton>
        </div>
        <div className='addCourse'>
          <h2 className='inline'>Save Menu</h2>
          <IconButton onClick={saveMenu}>
            <Save />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

interface FormGeneratorProps {
  history: History
}

export default FormGenerator
