import React, { Component } from 'react'
import {createContainer} from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Header, Form, Icon, Input, Grid, Segment } from 'semantic-ui-react'
import Loading from '../Loading';


class Privacy extends Component{
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
          <Icon name='eye' />
          <Header.Content>
            Privacy Settings
            <Header.Subheader>
              Manage your preferences
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Segment raised>
          <Form onSubmit={this.handleSubmit.bind(this)} loading={loading} >
            <Form.Input name='Name' label='Name' required type='text' />
            <Form.Input name='username' label='Username' required type='text'/>
            <Form.Field>
              <Input name="email" type="email" iconPosition='left' required placeholder='Email'>
                <Icon name='at' />
                <input />
              </Input>
            </Form.Field>
            <Button primary type='submit'>Update</Button>
          </Form>
        </Segment>
      </Container>
    );
  }
}

export default createContainer(() => {
  return { currentUser: Meteor.user(), loginToken: localStorage.getItem("Meteor.loginToken")  };
},Privacy);
