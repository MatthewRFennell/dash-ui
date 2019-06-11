import * as React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, user, admin = false, ...rest }) => {

  const renderComponent = (props) =>
    user.loggedIn && (!admin || user.admin) ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location },
        }}
      />
    )

  return <Route {...rest} render={renderComponent} />
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const connectedPrivateRoute = connect(
  mapStateToProps,
  null,
  null,
  { pure: false },
)(PrivateRoute)

export { connectedPrivateRoute as PrivateRoute }
