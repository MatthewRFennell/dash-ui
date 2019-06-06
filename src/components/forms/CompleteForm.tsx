import { Card, CardActionArea, CardContent } from '@material-ui/core'
import * as React from 'react'

import './Form.scss'
import MenuSelector from './MenuSelector'

const CompleteForm: React.FunctionComponent<CompleFormProps> = (props) => {
  const [data, setData] = React.useState(undefined)

  const [selected, setSelected] = React.useState(-1)

  const [invalid, setInvalid] = React.useState(false)

  React.useEffect(() => {
    fetch(DASH_API + '/getMenus?form_id=' + props.match.params.form_id)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setData({
            attendee: res.attendee,
            menus: res.itineraries,
          })
        } else {
          setInvalid(true)
        }
      })
  }, [])

  if (selected >= 0) {
    return <MenuSelector menu={data.menus[selected]} />
  }

  const selectMenu = (index) => () => {
    setSelected(index)
  }

  if (invalid) {
    return <h1>Sorry that is not a recognised link</h1>
  }

  console.log(data)
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
        {data.menus
          ? data.menus.map((m, i) => (
              <Card className='actionCard' key={i}>
                <CardActionArea onClick={selectMenu(i)}>
                  <CardContent>
                    <h1>{m.name}</h1>
                    <p>{m.description}</p>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))
          : undefined}
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

interface Match {
  params: Params
  isExact: boolean
  url: string
  path: string
}

export default CompleteForm
