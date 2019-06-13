/* Main Imports */
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Router, Switch } from 'react-router-dom'
import { PrivateRoute } from './components/router/privateRoute'
import './style.scss'

/* Google analytics */
import * as ReactGA from 'react-ga'
ReactGA.initialize('UA-141837333-1')
ReactGA.pageview(window.location.pathname + window.location.search)

import store from './redux/store'

/* Component Imports */
import { createMuiTheme } from '@material-ui/core'
import { createBrowserHistory } from 'history'
import Dashboard from './components/dashboard/Dashboard'
import CompleteForm from './components/forms/CompleteForm'
import { Login } from './components/frontpage/Login'
import Register from './components/frontpage/Register'
import Loader from './components/misc/Loader'
import NotFound from './components/misc/NotFound'

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
      <Router history={createBrowserHistory()}>
        <Switch>
          <PrivateRoute exact={true} path='/' component={Dashboard} />
          <Route exact={true} path='/login' component={Login} />
          <Route exact={true} path='/register' component={Register} />
          <Route exact={true} path='/loader' component={Loader} />
          <Route exact={true} path='/completeform/:form_id' component={CompleteForm} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('example'),
)
