import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './style.scss'

import Hello from './components/Hello'
import NotFound from './components/notfound/NotFound'

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact={true} path='/' component={Hello} />
      <Route component={NotFound} />
    </Switch>
  </Router>,
  document.getElementById('example'),
)
