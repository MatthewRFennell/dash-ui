import * as React from 'react'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

import fetchProtected from '../../../api/protected'
import './DetailCard.scss'

const DetailCard: React.FunctionComponent<DetailCardProps> = (props) => {
  const [loading, setLoading] = React.useState<boolean>(true)
  React.useEffect(() => {
    fetchProtected(DASH_API + '/events', null, null, 'GET', (res) => {
      console.log(res.events)
      setLoading(false)
    })
  }, [])
  return (
    <Card className='detail-card'>
      <CardContent>
        <Typography className='pre-title'>Events for</Typography>
        <Typography className='title'>{props.fname + ' ' + props.sname}</Typography>
        {loading && <CircularProgress />}
      </CardContent>
    </Card>
  )
}

interface DetailCardProps {
  account_id: number
  fname: string
  sname: string
}

export default DetailCard
