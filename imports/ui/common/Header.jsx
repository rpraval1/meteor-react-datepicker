//import libraries
import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import NavBar from './NavBar';
import AdminNavBar from './AdminNavBar';

//create component
class Header extends Component {


  render(){

    const { currentUser, loginToken } = this.props

    return(
      <NavBar />
    );
  }

}

export default createContainer(() => {
  return { currentUser: Meteor.user(), loginToken: localStorage.getItem("Meteor.loginToken")  };
},Header);
