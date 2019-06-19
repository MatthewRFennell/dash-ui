import { Card, IconButton, Paper, TextField, Typography } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
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
    <div className='new-course' style={{ margin: 0, padding: 0 }}>
      <Divider style={{ marginTop: '15px' }} />
      <IconButton id='close'>
        <Close />
      </IconButton>
      <Typography className='block-title'>Course Name</Typography>
      <EditBox preset={props.course.name} saved={props.course.name !== ''} title='Course Name' setValue={setTitle} />
      <Card className='newDish'>
        <div className='dishField'>
          <TextField
            variant='outlined'
            label='Dish Name'
            value={dishName}
            onChange={handleNameChange}
            fullWidth={true}
          />
        </div>
        <div className='dishField'>
          <TextField
            variant='outlined'
            multiline={true}
            label='Dish Description'
            value={dishDescription}
            fullWidth={true}
            onChange={handleDescChange}
          />
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
    </div>
  )
}

interface CourseGeneratorProps {
  course: NewCourse
  add: (d: NewDish) => void
  remove: (index: number) => void
  setTitle: (title: string) => void
}

export default CourseGenerator
