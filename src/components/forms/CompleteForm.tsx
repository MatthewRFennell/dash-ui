import { Card, CardActionArea, CardContent } from '@material-ui/core'
import * as React from 'react'
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { Itinerary } from '../../typings/BackendTypes'
import { Attendee } from '../../typings/BackendTypes'
import Loader from '../misc/Loader'
import './Form.scss'
import MenuSelector from './MenuSelector'

const CompleteForm: React.FunctionComponent<CompleFormProps> = (props) => {
  const [data, setData] = React.useState<GetMenusData>(undefined)

  const [selected, setSelected] = React.useState<number>(-1)

  const [invalid, setInvalid] = React.useState<boolean>(false)

  const form_id = props.match.params.form_id

  React.useEffect(() => {
    fetch(DASH_API + '/getMenus?form_id=' + form_id)
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          if (res.success) {
            setData({
              attendee: res.attendee,
              itineraries: res.itineraries,
              logoImage: res.logo_image,
            })
          } else {
            setInvalid(true)
          }
        }, 750)
      })
  }, [])

  const selectMenu = (index) => () => {
    setSelected(index)
  }

  const completed = () => {
    setData((oldData) => ({
      attendee: oldData.attendee,
      itineraries: oldData.itineraries.filter((m, i) => i !== selected),
      logoImage: oldData.logoImage,
    }))
    setSelected(-1)
  }

  const handleReset = () => {
    setSelected(-1)
  }

  if (invalid) {
    return <h1>Sorry that is not a recognised link</h1>
  }
  return (
    <ReactCSSTransitionGroup transitionName='fade' transitionEnterTimeout={300} transitionLeaveTimeout={300}>
      {data ? (
        selected < 0 ? (
          <div className='view'>
            <div key='main' className='new-course'>
              <div>
                <img src={data.logoImage} style={{ height: '120px', width: '120px', objectFit: 'cover' }} />
                <Typography className='header-text'>
                  Welcome, {data.attendee.fname} {data.attendee.sname}!
                </Typography>
              </div>
              {data.itineraries.length === 0 ? (
                <Typography className='main-text'>You have completed all of your available menu choices.</Typography>
              ) : (
                <Typography className='main-text'>Please complete your menu choices for these events:</Typography>
              )}
              <div className='newCourse' style={{ display: 'flex', alignItems: 'flex-start' }}>
                {data.itineraries ? (
                  data.itineraries.map((m, i) => (
                    <Card className='card-select' key={i}>
                      <CardActionArea onClick={selectMenu(i)}>
                        <CardContent>
                          <Typography className='card-header-text'>{m.name}</Typography>
                          <Divider />
                          <Typography className='card-body-text'>{m.description}</Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  ))
                ) : (
                  <h3>No menus to be completed</h3>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className='view' key='select'>
            <MenuSelector
              itinerary={data.itineraries[selected]}
              done={completed}
              form_id={form_id}
              logoImage={data.logoImage}
              onBack={handleReset}
            />
          </div>
        )
      ) : (
        <Loader
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000000,
            position: 'fixed',
            backgroundColor: 'white',
            top: 0,
            left: 0,
          }}
          key='loader'
        />
      )}
    </ReactCSSTransitionGroup>
  )
}

interface Params {
  form_id: string
}

interface CompleFormProps {
  match: Match
}

interface GetMenusData {
  itineraries: Itinerary[]
  attendee: Attendee
  logoImage: string
}

interface Match {
  params: Params
  isExact: boolean
  url: string
  path: string
}

export default CompleteForm
