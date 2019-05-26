/* Main Imports */
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PrivateRoute } from './components/router/privateRoute'
import './style.scss'

import history from './history'
import store from './redux/store'

/* Component Imports */
import { createMuiTheme } from '@material-ui/core'
import Hello from './components/Hello'
import NotFound from './components/notfound/NotFound'
import {Login} from './components/frontpage/Login';
import Register from './components/frontpage/Register';
import Thanks from './components/frontpage/Thanks';
import Home from './components/frontpage/Home';

/* Passing props to a routed page */
const HelloPage = () => <Hello compiler='TypeScript' framework='React' />

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Noto Sans JP',
  }
})

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <Switch>
          <Route exact={true} path='/' component={HelloPage} />
          <Route exact={true} path='/login' component={Login} />
          <Route exact={true} path='/register' component={Register} />
          <Route exact={true} path='/thanks' component={Thanks} />
          <PrivateRoute path='/home' component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('example'),
)
