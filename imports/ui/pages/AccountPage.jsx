//import libraries
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Landing from '../components/Landing';
import Accounts from '../components/Accounts';



import { Container } from 'semantic-ui-react'

// import { Template } from 'meteor/templating';
// import { Blaze } from 'meteor/blaze';
//import { Accounts, STATES } from '../../../imports/startup/accounts-config.js';


//create component
class AccountPage extends Component {

  render() {

    //console.log(this.props.currentUser);
    const { currentUser, children, loginToken } = this.props;

    // if (!localStorage.getItem("Meteor.loginToken")) {
    //   return <div>Loading...</div>;
    // }

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
