import React, { Component } from 'react'
import {createContainer} from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Container, Grid } from 'semantic-ui-react'
import Loading from './Loading';

import NavigationBox from './NavigationBox';

class Home extends Component{
  render(){
    const { currentUser, loginToken } = this.props

    if(loginToken && !currentUser) return <Loading />

    return(
      <Container>
        <Grid>
          <Grid.Column width={4} textAlign='center'>
            <NavigationBox />
          </Grid.Column>
          <Grid.Column>
            Test Feed
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default createContainer(() => {
  return { currentUser: Meteor.user(), loginToken: localStorage.getItem("Meteor.loginToken")  };
},Home);
