import Add from '@material-ui/icons/Add'
import Save from '@material-ui/icons/Save'
import * as React from 'react'
import { Header } from '../common/Header'

import { IconButton } from '@material-ui/core'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import fetchProtected from '../../../src/api/protected'
import CourseGenerator from './CourseGenerator'
import EditBox from './EditBox'
import './Form.scss'
import MenuThanks from './MenuThanks'

const FormGenerator = (props) => {

    const [menu, setMenu] = React.useState([{
      name: 'starters',
      dishes: [],
    }])

    const [done, setDone] = React.useState(false)

    const [caterer, setCaterer] = React.useState('')

    const handleAddDish = (index) => (dish) => {
      console.log('Yeet')
      console.log('Adding dish', dish)
      setMenu((oldMenu) => oldMenu.map((c, i) => i !== index ? c : {
        name: c.name,
        dishes: c.dishes.concat(dish),
      }))
    }

    const setCourseName = (index) => (name) => {
      setMenu((oldMenu) => oldMenu.map((c, i) => i !== index ? c : {
        name,
        dishes: c.dishes,
      }))
    }

    const addNewCourse = () => {
      setMenu((oldMenu) => oldMenu.concat({
        name: '',
        dishes: [],
      }))
    }

    const saveMenu = () => {
      console.log('Menu save', menu)
      const body = {
        itinerary_id: props.itinerary_id,
        caterer,
        courses: menu,
      }

      fetchProtected(DASH_API + '/menu', null, body, 'POST', (res) => {
        setDone(true)
      })

    }

    const updateCaterer = (value) => {
      setCaterer(value)
    }

    if (!done && props.itinerary_id === undefined) {
      return <Redirect to='/'/>
    }
    console.log('Render, done', done)
    if (done) {
      return <MenuThanks history={props.history}/>
    }

    return (
        <div>
            <Header/>
            <div className='page'>
                <h1 className='form-header'>Create a Menu</h1>
                <EditBox title='Caterer' setValue={updateCaterer}/>
                {
                  menu.map((course, index) => (
                    <CourseGenerator
                      course={course}
                      key={index}
                      add={handleAddDish(index)}
                      setTitle={setCourseName(index)}
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

const mapStateToProps = (state) => {
  return {
    itinerary_id: state.form.itinerary_id,
  }
}

const ConnectedFormGenerator = connect(mapStateToProps)(FormGenerator)

export {ConnectedFormGenerator as FormGenerator}
