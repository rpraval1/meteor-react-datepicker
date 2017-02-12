import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// App component
import App from '../../ui/components/App.jsx'

// Pages
import SignupPage from '../../ui/pages/SignUpPage.jsx';
import SignInPage from '../../ui/pages/SignInPage.jsx';
import LandingPage from '../../ui/pages/LandingPage';
import AccountPage from '../../ui/pages/AccountPage';
import ManageUsersPage from '../../ui/pages/ManageUsersPage';
import ManageRolesPage from '../../ui/pages/ManageRolesPage';

export const renderRoutes = () => (
  <Router history={browserHistory} >
    <Route path='/' component={App}>
      <IndexRoute component={LandingPage} />
      <Route path="signin" component={SignInPage}/>
      <Route path="signup" component={SignupPage}/>
      <Route path="account" component={AccountPage}/>
      <Route path="home" component={LandingPage}/>
      <Route path="manage/users" roles={['manage-roles']} group={'super-admin'} component={ManageUsersPage}/>
      <Route path="manage/roles" roles={['manage-users']} group={'super-admin'} component={ManageRolesPage}/>
      // <Route path="/signin" component={() => <Accounts.ui.LoginForm />} />
      // <Route path="/signup" component={() => <Accounts.ui.LoginForm formState={STATES.SIGN_UP} />} />
      // Add custom routes here
    </Route>
  </Router>
);
