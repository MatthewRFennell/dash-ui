import * as React from 'react'

import { Button, Card, CardActionArea, CardContent, Divider, Paper, Typography } from '@material-ui/core'
import './Form.scss'

import Save from '@material-ui/icons/Save'
import { Itinerary } from '../../typings/BackendTypes'

const MenuSelector: React.FunctionComponent<MenuSelectorProps> = (props) => {
  const [selection, setSelection] = React.useState(props.itinerary ? props.itinerary.menu.courses.map(() => -1) : [])

  const makeChoice = (courseIndex, dishIndex) => () => {
    setSelection((oldSelection) =>
      oldSelection.map((s, i) => (i !== courseIndex ? s : s === dishIndex ? -1 : dishIndex)),
    )
  }

  const submitChoice = () => {
    const body = {
      uuid: props.form_id,
      choices: [
        {
          itinerary_id: props.itinerary.itinerary_id,
          dish_ids: selection.map((s, i) => props.itinerary.menu.courses[i].dishes[s].dish_id),
        },
      ],
    }

    fetch(DASH_API + '/makeChoice', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'Application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          props.done()
        }
      })
  }

  const disabled = selection.filter((s) => s === -1).length > 0

  if (!props.itinerary) {
    return <h1>Something went wrong</h1>
  }

  return (
    <div className='new-course'>
      <Button
        style={{ position: 'fixed', top: '30px', right: '30px' }}
        variant='outlined'
        color='primary'
        onClick={props.onBack}
      >
        Back
      </Button>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={props.logoImage} style={{ height: '120px', width: '120px' }} />
        <div style={{ marginLeft: '30px' }}>
          <Typography className='header-text'>{props.itinerary.name}</Typography>
          <Typography className='main-text' style={{ marginTop: '-10px' }}>
            {props.itinerary.description}
          </Typography>
        </div>
      </div>
      {props.itinerary.menu.courses.map((course, cIndex) => (
        <div key={cIndex}>
          {cIndex > 0 && <Divider />}
          <Typography style={{ fontSize: '24pt', fontWeight: 'bold', marginTop: '30px' }}>{course.name}</Typography>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            {course.dishes.map((dish, dIndex) => (
              <Card key={dIndex} className='card-select' raised={selection[cIndex] === dIndex}>
                <CardActionArea onClick={makeChoice(cIndex, dIndex)}>
                  <CardContent>
                    <Typography className='card-header-text'>{dish.name}</Typography>
                    <Divider />
                    <Typography className='card-body-text'>{dish.description}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </div>
        </div>
      ))}
      <Button
        color='primary'
        variant='outlined'
        disabled={disabled}
        onClick={submitChoice}
        style={{ fontWeight: 'bold', marginTop: '30px' }}
      >
        <Save style={{ marginRight: '10px' }} />
        Save selection
      </Button>
    </div>
  )
}

interface MenuSelectorProps {
  itinerary: Itinerary
  form_id: string
  logoImage: string
  onBack: () => void
  done: () => void
}

export default MenuSelector
