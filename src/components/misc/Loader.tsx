import * as React from 'react'

// tslint:disable-next-line:no-var-requires
const loader = require('../../../assets/mp4/loader.mp4')

const Loader: React.FunctionComponent<{ style: React.CSSProperties }> = ({ style }) => (
  <div
    style={
      style || { width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }
    }
  >
    <video width='420' height='420' loop={true} autoPlay={true}>
      <source src={loader} type='video/mp4' />
    </video>
  </div>
)

export default Loader
