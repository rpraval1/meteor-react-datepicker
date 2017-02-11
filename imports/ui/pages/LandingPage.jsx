//import libraries
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Landing from '../components/Landing';
import Home from '../components/Home';

import { browserHistory } from 'react-router';



//create component
class LandingPage extends Component {

  render() {

    //console.log(this.props.currentUser);
    const { currentUser, children, loginToken } = this.props;


    return(
      <div className="container">
        { loginToken ? <Home /> : <Landing />
        }
    </div>

  );
}
}

export default createContainer(() => {
  return { currentUser: Meteor.user(), loginToken: localStorage.getItem("Meteor.loginToken")  };
},LandingPage);
