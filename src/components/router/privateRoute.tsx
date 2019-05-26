import * as React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';


const PrivateRoute = ({ component: Component, user,...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        user.loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const connectedPrivateRoute = connect(mapStateToProps, null, null, {pure : false})(PrivateRoute)

export {connectedPrivateRoute as PrivateRoute}