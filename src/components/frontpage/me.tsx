import * as React from 'react'
import { connect } from 'react-redux'
import { fetchDetails } from '../../redux/actions/userActions'

const Me = (props) => {
  React.useEffect(() => {
    props.fetchData()
  }, [])

  return (
    <div>
      <h1>Email: {props.email}</h1>
      <h1>
        Name: {props.fname} {props.sname}
      </h1>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    email: state.user.email,
    fname: state.user.fname,
    sname: state.user.sname,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => {
      dispatch(fetchDetails())
    },
  }
}

const connectedMe = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Me)

export { connectedMe as Me }
