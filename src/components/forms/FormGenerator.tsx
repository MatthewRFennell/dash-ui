import Add from '@material-ui/icons/Add'
import Save from '@material-ui/icons/Save'
import * as React from 'react'
import { Header } from '../common/Header'

import { IconButton } from '@material-ui/core'
import CourseGenerator from './CourseGenerator'
import './Form.scss'

const FormGenerator = () => {

    const [menu, setMenu] = React.useState([{
      title: 'starters',
      dishes: [
        {
          title: 'Soup',
          description: 'Lovely soup of the day',
        },
      ],
    }])

    const handleAddDish = (index) => (dish) => {
      console.log('Yeet')
      console.log('Adding dish', dish)
      setMenu((oldMenu) => oldMenu.map((c, i) => i !== index ? c : {
        title: c.title,
        dishes: c.dishes.concat(dish),
      }))
    }

    const setCourseTitle = (index) => (title) => {
      setMenu((oldMenu) => oldMenu.map((c, i) => i !== index ? c : {
        title,
        dishes: c.dishes,
      }))
    }

    const addNewCourse = () => {
      setMenu((oldMenu) => oldMenu.concat({
        title: '',
        dishes: [],
      }))
    }

    const saveMenu = () => {
      console.log('Menu save', menu)
    }

    return (
        <div>
            <Header/>
            <div className='page'>
                <h1 className='form-header'>Create a Menu</h1>
                {
                  menu.map((course, index) => (
                    <CourseGenerator
                      course={course}
                      key={index}
                      add={handleAddDish(index)}
                      setTitle={setCourseTitle(index)}
                    />
                  ))
                }
                <div className='addCourse'>
                    <h2 className='inline'>Add new Course</h2>
                    <IconButton onClick={addNewCourse}>
                        <Add/>
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

export default FormGenerator
