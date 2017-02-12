import React, { Component } from 'react'
import {createContainer} from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Header, Form, Message, Icon, Input, Grid, Segment } from 'semantic-ui-react'
import Loading from '../Loading';


class General extends Component{
  constructor(props){
    super(props);
    this.state = {
      msg: false,
      visible:false,
      loading:false,
      success: false,
      error: false,
      message: ''
    };

  }

  handleSubmit(e,{formData}){
    e.preventDefault();
    //Lets use Meteor.call
    this.setState({
      loading: true
    })

    Meteor.call('users.update',formData, (err)=>{
      if(err){
        this.setState({
          error: true,
          success: false,
          msg: true,
          message: err.reason
        })
      } else {
        this.setState({
          success: true,
          error: false,
          msg: true,
          message: 'Personal Details were updated successfully.'
        })
      }
      this.setState({
        loading: false
      })
    })
  }

  handleDismiss(){
    this.setState({ error: '',
    visible:false })

    // setTimeout(() => {
    //   this.setState({ visible: true })
    // }, 2000)
  }

  render(){
    const { currentUser, loginToken } = this.props
    const {msg, error,loading, success, message} = this.state;

    if(loginToken && !currentUser) return <Loading />

    return(
      <Container>
        <Header as='h3'>
          <Icon name='settings' />
          <Header.Content>
            General Settings
            <Header.Subheader>
              Manage your preferences
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Segment raised>
          {msg ?
          <Message success={success} error={error} onDismiss={this.handleDismiss.bind(this)}>
            <Message.Header>{message}</Message.Header>
          </Message> : '' }
          <Form onSubmit={this.handleSubmit.bind(this)} loading={loading} success={success} error={error}>
            <Form.Input name='name' label='Name' defaultValue={currentUser.profile.name} required type='text' />
            <Form.Input name='username' label='Username' defaultValue={currentUser.username} required type='text'/>
            <Form.Field>
              <Input name="email" disabled type="email" defaultValue={currentUser.emails[0].address} iconPosition='left' required placeholder='Email'>
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
},General);
