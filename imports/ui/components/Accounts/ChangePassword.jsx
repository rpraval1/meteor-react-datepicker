import React, { Component } from 'react'
import {createContainer} from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Header, Form, Icon, Input, Grid, Segment } from 'semantic-ui-react'
import Loading from '../Loading';


class ChangePassword extends Component{
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
    const { currentUser, loginToken } = this.props
    const {error,loading} = this.state;

    if(loginToken && !currentUser) return <Loading />

    return(
      <Container>
        <Header as='h3'>
          <Icon name='privacy' />
          <Header.Content>
            Change password
            <Header.Subheader>
              Change your login password
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Segment raised>
          <Form onSubmit={this.handleSubmit.bind(this)} loading={loading} >
            <Form.Input name='currentpassword' label='CurrentPassword' required type='text' />
            <Form.Input name='newpassword' label='newpassword' required type='text'/>
            <Form.Input name='newpassword' label='newpassword'  required type='text'/>
            <Button primary type='submit'>Update</Button>
          </Form>
        </Segment>
      </Container>
    );
  }
}

export default createContainer(() => {
  return { currentUser: Meteor.user(), loginToken: localStorage.getItem("Meteor.loginToken")  };
},ChangePassword);
