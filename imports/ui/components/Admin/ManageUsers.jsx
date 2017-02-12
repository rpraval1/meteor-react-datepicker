import React, { Component } from 'react'
import {createContainer} from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Header, Form, Icon, Input, Grid, Table, Segment } from 'semantic-ui-react'
import Loading from '../Loading';


class ManageUsers extends Component{
  constructor(props){
    super(props);
    this.state = {
      error: '',
      visible:false,
      loading:false
    };

  }

  handleSubmit(e,{formData}){
    e.preventDefault();

  }

  render(){
    const { currentUser, loginToken, allUsers } = this.props
    const {error,loading} = this.state;

    if(loginToken && !currentUser) return <Loading />

    return(
      <Container>
        <Header as='h3'>
          <Icon name='settings' />
          <Header.Content>
            Manage Users
            <Header.Subheader>
              Manage all users of the website
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Segment raised>
          <Table color='blue' >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>UserName</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {allUsers.map(user => (
                <Table.Row key={user._id}>
                  <Table.Cell>{user.profile.name}</Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.emails[0].address}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>
      </Container>
    );
  }
}

export default createContainer(() => {

  //Lets subscribe to check if user is admin
  Meteor.subscribe('get-all-users');

  return {
    currentUser: Meteor.user(),
    allUsers: Meteor.users.find({}).fetch(),
    loginToken: localStorage.getItem("Meteor.loginToken")
  };
},ManageUsers);
