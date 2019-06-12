import { Card, CardActionArea, CardContent } from '@material-ui/core'
import * as React from 'react'

import { Itinerary } from '../../typings/BackendTypes'
import { Attendee } from '../../typings/BackendTypes'
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
        if (res.success) {
          setData({
            attendee: res.attendee,
            itineraries: res.itineraries,
          })
        } else {
          setInvalid(true)
        }
      })
  }, [])

  const selectMenu = (index) => () => {
    setSelected(index)
  }

  const completed = () => {
    setData((oldData) => ({
      attendee: oldData.attendee,
      itineraries: oldData.itineraries.filter((m, i) => i !== selected),
    }))
    setSelected(-1)
  }

  if (selected >= 0) {
    return <MenuSelector itinerary={data.itineraries[selected]} done={completed} form_id={form_id} />
  }

  if (invalid) {
    return <h1>Sorry that is not a recognised link</h1>
  }

  if (!data) {
    return <h1>Loading data</h1>
  }

  return (
    <div className='newCourse'>
      <h1>
        Welcome {data.attendee.fname} {data.attendee.sname}
      </h1>
      <h2>Please complete your menu choices for these events</h2>
      <div className='newCourse'>
        {data.itineraries ? (
          data.itineraries.map((m, i) => (
            <Card className='actionCard' key={i}>
              <CardActionArea onClick={selectMenu(i)}>
                <CardContent>
                  <h1>{m.name}</h1>
                  <p>{m.description}</p>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        ) : (
          <h3>No menus to be completed</h3>
        )}
      </div>
    </div>
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
}

interface Match {
  params: Params
  isExact: boolean
  url: string
  path: string
}

export default CompleteForm
