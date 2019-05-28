import * as React from 'react'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

import './styles.scss'

const EventCard: React.FunctionComponent<EventCardProps> = (props: EventCardProps) => {
  return (
    <Card className='card'>
      <img src={props.image} className='card-header' />
      <CardContent>
        Hello
      </CardContent>
      <CardActions>
        <Button>Edit Details</Button>
      </CardActions>
    </Card>
  )
}

export interface EventCardProps {
  name: string
  image: string
}

export default EventCard
