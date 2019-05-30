import * as React from 'react'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import './Card.scss'

// tslint:disable-next-line:no-var-requires
const placeholderImage = require('../../../assets/png/care-bears.jpg')

const EventCard: React.FunctionComponent<EventCardProps> = (props: EventCardProps) => {
  return (
    <Card className='card'>
      <img src={placeholderImage} className='card-header' />
      <CardContent>
        <Typography className='card-date'>
          {props.date.getDay()}/{props.date.getMonth()}/{props.date.getFullYear()}
        </Typography>
        <Typography className='card-title'>{props.name}</Typography>
        <Typography className='card-body'>{props.blurb}</Typography>
      </CardContent>
      <CardActions>
        <Button className='card-button' onClick={props.action}>Edit Details</Button>
      </CardActions>
    </Card>
  )
}

export interface EventCardProps {
  event_id: number
  name: string
  image: string
  date: Date
  blurb: string
  action: () => void
}

export default EventCard
