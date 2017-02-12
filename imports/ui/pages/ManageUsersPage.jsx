//import libraries
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Landing from '../components/Landing';
import ManageUsers from '../components/Admin/ManageUsers';

import { Container } from 'semantic-ui-react'

//create component
class ManageUsersPage extends Component {

  render() {

    const { currentUser, children, loginToken } = this.props;


    return(
      <Container>
        { loginToken ? <ManageUsers /> : <Landing />
        }
      </Container>

  );
}
}

export default createContainer(() => {
  return { currentUser: Meteor.user(), loginToken: localStorage.getItem("Meteor.loginToken")  };
},ManageUsersPage);
