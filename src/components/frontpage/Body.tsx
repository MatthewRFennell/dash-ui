import * as clasnames from 'classnames'
import * as React from 'react'

import './frontpage.scss'

class Body extends React.Component<{}, {}> {
  public render() {
    return (
      <div className='centered-view'>
        <div>
          <div className={clasnames('italic', 'body')}>
            A solution to all your Subtle Asian Problems.
          </div>
          <div className='body'>
            The deep-learning blockchain powered neural network engine will
            offer personalized experiences through AR and VR technologies.
            Utilizing the Internet of Things (IoT) we can provide the highest
            quality of problem-solving skills from our microservice
            architecture.
          </div>
        </div>
      </div>
    )
  }
}

export default Body
