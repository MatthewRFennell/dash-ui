/* Main Imports */
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './style.scss'

/* Component Imports */
import { createMuiTheme } from '@material-ui/core'
import FrontPage from './components/frontpage/Frontpage'
import Hello from './components/Hello'
import NotFound from './components/notfound/NotFound'
import Login from './components/frontpage/Login';
import Register from './components/frontpage/Register';
import Thanks from './components/frontpage/Thanks';

/* Passing props to a routed page */
const HelloPage = () => <Hello compiler='TypeScript' framework='React' />

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Noto Sans JP',
  }
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route exact={true} path='/' component={HelloPage} />
        <Route exact={true} path='/home' component={FrontPage} />
        <Route exact={true} path='/login' component={Login} />
        <Route exact={true} path='/register' component={Register} />
        <Route exact={true} path='/thanks' component={Thanks} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('example'),
)
