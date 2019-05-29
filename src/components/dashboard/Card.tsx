import * as React from 'react'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import './styles.scss'

const EventCard: React.FunctionComponent<EventCardProps> = (props: EventCardProps) => {
  return (
    <Card className='card'>
      <img src={props.image} className='card-header' />
      <CardContent>
        <Typography className='card-date'>
          {props.date.getDay()}/{props.date.getMonth()}/{props.date.getFullYear()}
        </Typography>
        <Typography className='card-title'>{props.name}</Typography>
        <Typography className='card-body'>{props.blurb}</Typography>
      </CardContent>
      <CardActions>
        <Button className='card-button'>Edit Details</Button>
      </CardActions>
    </Card>
  )
}

export interface EventCardProps {
  name: string
  image: string
  date: Date
  blurb: string
}

export default EventCard
