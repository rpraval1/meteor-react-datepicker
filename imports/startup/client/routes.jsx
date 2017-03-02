import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// App component
import App from '../../ui/components/App.jsx'

// Pages
import ManageDataPage from '../../ui/pages/ManageDataPage.jsx';
import CreateFormPage from '../../ui/pages/CreateFormPage.jsx';


export const renderRoutes = () => (
  <Router history={browserHistory} >
    <Route path='/' component={App}>
      <IndexRoute component={CreateFormPage} />
      <Route path="myFormData" component={ManageDataPage}/>

      // <Route path="/signin" component={() => <Accounts.ui.LoginForm />} />
      // <Route path="/signup" component={() => <Accounts.ui.LoginForm formState={STATES.SIGN_UP} />} />
      // Add custom routes here
    </Route>
  </Router>
);
