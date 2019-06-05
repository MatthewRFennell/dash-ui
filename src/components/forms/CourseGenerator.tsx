import { Card, IconButton, Paper, TextField } from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import * as React from 'react'
import EditBox from './EditBox'

const CourseGenerator = (props) => {

    const [dishTitle, setDishTitle] = React.useState('')
    const [dishDescription, setDishDescription] = React.useState('')

    const handleDescChange = (event) => {
        setDishDescription(event.target.value)
    }

    const handleTitleChange = (event) => {
        setDishTitle(event.target.value)
    }

    const add = (event) => {
        props.add({
            title: dishTitle,
            description: dishDescription,
        })
        setDishTitle('')
        setDishDescription('')
    }

    const setTitle = (title) => {
        props.setTitle(title)
    }

    return (
        <Paper className='newCourse'>
            <EditBox title='Course Title' setValue={setTitle}/>
            <br />
            <Card className='newDish'>
                <div className='dishField'>
                    <TextField
                        label='Dish Name'
                        value={dishTitle}
                        onChange={handleTitleChange}
                    />
                </div>
                <div className='dishField'>
                    <TextField
                        label='Dish Description'
                        value={dishDescription}
                        onChange={handleDescChange}
                    />
                </div>
                <div className='buttonContainer'>
                    <IconButton onClick={add}>
                        <Add
                            color='primary'
                        />
                    </IconButton>
                </div>
            </Card>
            {props.course.dishes.map((d, i) => {
                return (
                    <Card className='dish' key={i}>
                        <h1>{d.title}</h1>
                        <p>{d.description}</p>
                    </Card>
                )
            })}
        </Paper>
    )
}

export default CourseGenerator
