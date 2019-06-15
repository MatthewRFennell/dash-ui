import * as React from 'react'
import { connect } from 'react-redux'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

import './UserCard.scss'

// tslint:disable-next-line:no-var-requires
const placeholder1 = require('../../../../assets/png/user-placeholder-1.png')
// tslint:disable-next-line:no-var-requires
const placeholder2 = require('../../../../assets/png/user-placeholder-2.png')
// tslint:disable-next-line:no-var-requires
const placeholder3 = require('../../../../assets/png/user-placeholder-3.png')
// tslint:disable-next-line:no-var-requires
const placeholder4 = require('../../../../assets/png/user-placeholder-4.png')
// tslint:disable-next-line:no-var-requires
const placeholder5 = require('../../../../assets/png/user-placeholder-5.png')

const UserCard: React.FunctionComponent<UserCardProps> = (props) => {
  const chooser = Math.random()
  const placeholder =
    chooser < 0.2
      ? placeholder1
      : chooser < 0.4
      ? placeholder2
      : chooser < 0.6
      ? placeholder3
      : chooser < 0.8
      ? placeholder4
      : placeholder5
  return (
    <Card className='user-card' raised={props.raised}>
      {props.vaporwave && (
        <div className='window-title-bar'>
          {props.fname} {props.sname}
          <button className='close-button' onClick={props.onClick}>
            <div className='maximize'>{props.raised ? '🗕' : '🗖'}</div>
          </button>
        </div>
      )}
      <div>
        <CardContent className='user-content'>
          <div className='user-image'>
            <Tooltip title='hmm?' enterDelay={5000} placement='left-start'>
              <img className='user-placeholder' src={props.image || placeholder} draggable={false} />
            </Tooltip>
          </div>
          <CardActionArea className='user-details' onClick={props.onClick}>
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

const mapStateToProps = (state) => ({ vaporwave: state.meme.vaporwave })

interface UserCardProps {
  fname: string
  sname: string
  email: string
  image?: string
  raised: boolean
  vaporwave: boolean
  onClick: () => void
}

export default connect(mapStateToProps)(UserCard)
