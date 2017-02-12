import React, { Component } from 'react'
import {createContainer} from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Header, Form, Icon, Input, Grid, Table, Segment } from 'semantic-ui-react'
import Loading from '../Loading';


class ManageRoles extends Component{
  constructor(props){
    super(props);
    this.state = {
      error: '',
      success: false,
      visible:false,
      loading: false,
      formerror: false
    };
  }

  handleSubmit(e,{formData}){
    e.preventDefault();
    this.setState({loading: true})

    //validate
    Meteor.call('role.create',formData, function(error){
      if(error){
        //console.log(error.reason);
        this.setState({error:error.reason, visible:true, formerror: true})
      } else {
        // reload table ....
        this.setState({
          success: true,
          error:''
        })
        //document.getElementById('role').children[0].value = "";
        document.getElementById("addRole").reset();

      }
      this.setState({loading: false})
    }.bind(this))

  }



  render(){
    const { currentUser, loginToken, allRoles } = this.props
    const {error,loading, formerror, success, roleDesp} = this.state;

    if(loginToken && !currentUser) return <Loading />
    //console.log(allRoles);
    return(
      <Container>
        <Header as='h3'>
          <Icon name='settings' />
          <Header.Content>
            Manage Roles
            <Header.Subheader>
              Manage roles of the website
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Segment raised>
          <Header as='h3'>Add New Role</Header>
        <Form id="addRole" onSubmit={this.handleSubmit.bind(this)} loading={loading} error={formerror}>
            <Form.Group>
              <Form.Input inline id="role" name='role' defaultValue={roleDesp} label='Enter Role Name' required type='text'/>
              <Button primary type='submit'>Add Role</Button>
            </Form.Group>
          </Form>

          <Table color='blue' >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {allRoles.map(role => (
                <Table.Row key={role._id}>
                  <Table.Cell>{role.name}</Table.Cell>
                <Table.Cell>Edit/Delete</Table.Cell>
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
  Meteor.subscribe('get-all-roles');

  return {
    currentUser: Meteor.user(),
    allRoles: Meteor.roles.find({}).fetch(),
    loginToken: localStorage.getItem("Meteor.loginToken")
  };
},ManageRoles);
