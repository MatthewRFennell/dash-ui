/* Main Imports */
import * as React from 'react'

/* Material UI Imports */
import Button from '@material-ui/core/Button'

/* Style Imports */
import './notfound.scss'

class NotFound extends React.Component<{}, {}> {
  public render() {
    return (
      <div className='centered-view'>
        <div>
          <div className='title'>
            PAGE NOT FOUND
          </div>
          <div className='subtitle'>
            Sorry, the requested content could not be found.
          </div>
          <Button className='back-button' variant='outlined'>
            Go Back
          </Button>
        </div>
        <div className='big-bkg-text'>
          404
        </div>
      </div>
    )
  }
}

export default NotFound
