import React, { Component } from 'react'
import {createContainer} from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Container, Grid } from 'semantic-ui-react'
import Loading from './Loading';
import AddBoard from './AddBoard';

class Home extends Component{


  render(){
    const { currentUser, loginToken } = this.props

    if(loginToken && !currentUser) return <Loading />

    return(
      <Container fluid>
        <AddBoard />
      </Container>
    );
  }
}

export default createContainer(() => {
  return { currentUser: Meteor.user(), loginToken: localStorage.getItem("Meteor.loginToken")  };
},Home);
