import * as React from 'react'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Event, EventRedued } from '../../typings/BackendTypes'

import './Card.scss'

const EventCard: React.FunctionComponent<EventCardProps> = (props: EventCardProps) => {
  return (
    <Card className='card'>
      <CardActionArea onClick={props.action}>
        <img src={props.image} className='card-header' />
        <CardContent className='card-content'>
          <Typography className='card-date'>
            {props.date.getDay()}/{props.date.getMonth()}/{props.date.getFullYear()}
          </Typography>
          <Typography className='card-title'>{props.name}</Typography>
          <Typography className='card-body'>{props.blurb}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export interface EventCardProps extends EventRedued {
  action: () => void
}

export default EventCard
