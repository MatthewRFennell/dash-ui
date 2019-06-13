import { Card, IconButton, Paper, TextField } from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import * as React from 'react'
import { Course } from '../../typings/BackendTypes'
import { NewCourse, NewDish } from '../../typings/CreationTypes'
import EditBox from './EditBox'

const CourseGenerator: React.FunctionComponent<CourseGeneratorProps> = (props) => {
  const [dishName, setDishName] = React.useState('')
  const [dishDescription, setDishDescription] = React.useState('')

  const handleDescChange: ChangeEventFunc = (event) => {
    setDishDescription(event.target.value)
  }

  const handleNameChange: ChangeEventFunc = (event) => {
    setDishName(event.target.value)
  }

  const handleRemoveDish = (index: number) => () => {
    props.remove(index)
  }

  const add = () => {
    if (dishName === '' || dishDescription === '') {
      return
    }

    props.add({
      name: dishName,
      description: dishDescription,
      warnings: [],
    })
    setDishName('')
    setDishDescription('')
  }

  const setTitle = (title: string) => {
    props.setTitle(title)
  }

  return (
    <Paper className='newCourse'>
      <IconButton id='close'>
        <Close />
      </IconButton>
      <EditBox preset={props.course.name} saved={props.course.name !== ''} title='Course Title' setValue={setTitle} />
      <br />
      <Card className='newDish'>
        <div className='dishField'>
          <TextField label='Dish Name' value={dishName} onChange={handleNameChange} />
        </div>
        <div className='dishField'>
          <TextField label='Dish Description' value={dishDescription} onChange={handleDescChange} />
        </div>
        <div className='buttonContainer'>
          <IconButton onClick={add}>
            <Add color='primary' />
          </IconButton>
        </div>
      </Card>
      {props.course.dishes.map((d, i) => {
        return (
          <Card className='dish' key={i} onClick={handleRemoveDish(i)}>
            <IconButton id='close'>
              <Close />
            </IconButton>
            <h1>{d.name}</h1>
            <p>{d.description}</p>
          </Card>
        )
      })}
    </Paper>
  )
}

interface CourseGeneratorProps {
  course: NewCourse
  add: (d: NewDish) => void
  remove: (index: number) => void
  setTitle: (title: string) => void
}

export default CourseGenerator
