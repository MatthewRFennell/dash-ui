import * as React from 'react'

import { Button, Card, CardActionArea, CardContent, Paper } from '@material-ui/core'
import './Form.scss'

import Save from '@material-ui/icons/Save'

const MenuSelector = (props) => {

    console.log(props.menu)

    const [selection, setSelection] = React.useState(props.menu.courses.map((c) => -1))

    const makeChoice = (courseIndex, dishIndex) => () => {
        setSelection((oldSelection) => oldSelection.map((s, i) =>
         i !== courseIndex ? s : (s === dishIndex ? -1 : dishIndex)))
    }

    const submitChoice = () => {
      console.log('Your choice is saved')
    }

    console.log('actionCard' + (1 === 1 ? ' selected' : ''))

    const disabled = selection.filter((s) => s === -1).length > 0

    return (
        <div className='newCourse'>
            <h1>{props.menu.name}</h1>
            <p>{props.menu.description}</p>

            {
                props.menu.courses.map((course, cIndex) => (
                    <Paper className='newCourse' key={cIndex}>
                        <h1>{course.name}</h1>
                        {
                            course.dishes.map((dish, dIndex) => (
                                <Card
                                  key={dIndex}
                                  className={'actionCard' + (selection[cIndex] === dIndex ? ' selected' : '')}
                                >
                                    <CardActionArea onClick={makeChoice(cIndex, dIndex)}>
                                        <CardContent>
                                            <h1>{dish.name}</h1>
                                            <p>{dish.description}</p>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            ))
                        }
                    </Paper>
                ))
            }
            <Button color='primary' disabled={disabled} onClick={submitChoice}>
                Save selection
                <Save/>
            </Button>
        </div>
    )
}

export default MenuSelector
