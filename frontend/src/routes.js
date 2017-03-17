import React from 'react'
import { Router, Route, IndexRoute, browserHistory  } from 'react-router'
import App from './containers/App'

import PatentListPage from './components/pages/PatientListPage/PatientListPage.jsx';
import PatientEditPage from './components/pages/PatientEditPage/PatientEditPage.jsx';

export default
<Router history={browserHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={PatentListPage} />
    <Route path="edit/:id" component={PatientEditPage}/>
  </Route>
</Router>