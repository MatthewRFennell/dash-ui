/* Main Imports */
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { connect, Provider } from 'react-redux'
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

const vaporwaveTheme = createMuiTheme({
  overrides: {
    MuiFab: {
      extended: {
        borderRadius: 0,
      },
      primary: {
        backgroundColor: '#c0c0c0',
        borderTop: 'ridge 3px #ffffff',
        borderLeft: 'ridge 3px #ffffff',
        borderRight: 'ridge 3px #808080',
        borderBottom: 'ridge 3px #808080',
        color: '#000000',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#a0a0a0',
        },
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: '#c0c0c0',
        borderTop: 'ridge 3px #ffffff',
        borderLeft: 'ridge 3px #ffffff',
        borderRight: 'ridge 3px #808080',
        borderBottom: 'ridge 3px #808080',
      },
      rounded: {
        borderRadius: 0,
      },
    },
    MuiButton: {
      root: {
        fontFamily: 'MS Sans Serif',
        fontSize: '11px',
        color: '#000000',
        textTransform: 'capitalize',
        background: '#c0c0c0',
        outlineColor: 'rgba(0, 0, 0, 0)',
        transition:
          'outline-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' +
          ', background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        '&:hover': {
          backgroundColor: '#b0b0b0',
        },
      },
      outlined: {
        borderRadius: 0,
      },
      outlinedPrimary: {
        color: '#000000',
        borderTop: 'ridge 3px #ffffff',
        borderLeft: 'ridge 3px #ffffff',
        borderRight: 'ridge 3px #808080',
        borderBottom: 'ridge 3px #808080',
        '&:hover': {
          borderTop: 'ridge 3px #ffffff',
          borderLeft: 'ridge 3px #ffffff',
          borderRight: 'ridge 3px #808080',
          borderBottom: 'ridge 3px #808080',
          backgroundColor: '#b0b0b0',
          outline: '1px solid black',
        },
        padding: 0,
        '&.Mui-disabled': {
          borderTop: 'ridge 3px #ffffff !important',
          borderLeft: 'ridge 3px #ffffff !important',
          borderRight: 'ridge 3px #808080 !important',
          borderBottom: 'ridge 3px #808080 !important',
        },
      },
      text: {
        borderRadius: 0,
      },
      textPrimary: {
        color: '#000000',
        borderTop: 'ridge 3px #ffffff',
        borderLeft: 'ridge 3px #ffffff',
        borderRight: 'ridge 3px #808080',
        borderBottom: 'ridge 3px #808080',
        '&:hover': {
          borderTop: 'ridge 3px #ffffff',
          borderLeft: 'ridge 3px #ffffff',
          borderRight: 'ridge 3px #808080',
          borderBottom: 'ridge 3px #808080',
          outline: '1px solid black',
        },
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: '6px 8px',
      },
      root: {
        backgroundColor: '#ffffff',
      },
      notchedOutline: {
        borderRadius: 0,
        borderColor: 'inherit !important',
        borderTop: 'inset 2px #808080',
        borderLeft: 'inset 2px #808080',
        borderRight: 'inset 2px #ffffff',
        borderBottom: 'inset 2px #ffffff',
      },
    },
  },
  typography: {
    fontFamily: 'MS Sans Serif',
  },
  palette: {
    primary: {
      main: '#000080',
    },
  },
})

const App: React.FunctionComponent<{ vaporwave: boolean }> = (props) => {
  return (
    <MuiThemeProvider theme={props.vaporwave ? vaporwaveTheme : theme}>
      <Switch>
        <PrivateRoute exact={true} path='/' component={Dashboard} />
        <Route exact={true} path='/login' component={Login} />
        <Route exact={true} path='/register' component={Register} />
        <Route exact={true} path='/loader' component={Loader} />
        <Route exact={true} path='/completeform/:form_id' component={CompleteForm} />
        <Route component={NotFound} />
      </Switch>
    </MuiThemeProvider>
  )
}

const mapStateToProps = (state) => {
  return {
    vaporwave: state.meme.vaporwave,
  }
}

const ConnectedApp = connect(mapStateToProps)(App)

ReactDOM.render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <ConnectedApp />
    </Router>
  </Provider>,
  document.getElementById('example'),
)
