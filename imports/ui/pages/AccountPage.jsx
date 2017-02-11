//import libraries
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Landing from '../components/Landing';
import Accounts from '../components/Accounts';



import { Container } from 'semantic-ui-react'



//create component
class AccountPage extends Component {

  render() {

    const { currentUser, children, loginToken } = this.props;


    return(
      <Container>
        { loginToken ? <Accounts /> : <Landing />
        }
      </Container>

  );
}
}

export default createContainer(() => {
  return { currentUser: Meteor.user(), loginToken: localStorage.getItem("Meteor.loginToken")  };
},AccountPage);
