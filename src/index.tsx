/* Main Imports */
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Router, Switch } from 'react-router-dom'
import { PrivateRoute } from './components/router/privateRoute'
import './style.scss'

import history from './history'
import store from './redux/store'

/* Component Imports */
import { createMuiTheme } from '@material-ui/core'
import Dashboard from './components/dashboard/Dashboard'
import { Login } from './components/frontpage/Login'
import Register from './components/frontpage/Register'
import Hello from './components/Hello'
import NotFound from './components/notfound/NotFound'

/* Passing props to a routed page */
const HelloPage = () => <Hello compiler='TypeScript' framework='React' />

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Lato',
  },
  palette: {
    primary: {
      main: '#0066ff',
    },
  },
})

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <Switch>
          <PrivateRoute exact={true} path='/' component={Dashboard} />
          <Route exact={true} path='/login' component={Login} />
          <Route exact={true} path='/register' component={Register} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('example'),
)
