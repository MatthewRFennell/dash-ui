import * as React from 'react'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import './UserCard.scss'

// tslint:disable-next-line:no-var-requires
const placeholder1 = require('../../../../assets/png/user-placeholder-1.png')
// tslint:disable-next-line:no-var-requires
const placeholder2 = require('../../../../assets/png/user-placeholder-2.png')

const UserCard: React.FunctionComponent<UserCardProps> = (props) => {
  const placeholder = Math.random() < 0.5 ? placeholder1 : placeholder2
  return (
    <Card className='user-card'>
      <div>
        <CardContent className='user-content'>
          <div className='user-image'>
            <img className='user-placeholder' src={props.image || placeholder} draggable={false} />
          </div>
          <CardActionArea className='user-details'>
            <Typography className='user-title'>
              {props.fname} {props.sname}
            </Typography>
            <Typography className='user-subtitle'>{props.email}</Typography>
          </CardActionArea>
        </CardContent>
      </div>
    </Card>
  )
}

interface UserCardProps {
  fname: string
  sname: string
  email: string
  image?: string
}

export default UserCard
