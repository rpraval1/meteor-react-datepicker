import React, { Component } from 'react'
import {createContainer} from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Container,Dropdown, Input, Icon, Grid,Menu,Segment } from 'semantic-ui-react'
import Loading from './Loading';

import General from './Accounts/General'
import ChangePassword from './Accounts/ChangePassword'
import Privacy from './Accounts/Privacy'

class Accounts extends Component{

  constructor(props){
   super(props);
   this.state = {
     activeItem: 'personal',
     pageContent: <General />
   };
  }

  handleItemClick(e,{name}){
    switch (name) {
      case 'personal':
        this.setState({
          activeItem: name,
          pageContent: <General />
        })
        break;
      case 'password':
        this.setState({
          activeItem: name,
          pageContent: <ChangePassword />
        })
        break;
      case 'privacy':
        this.setState({
          activeItem: name,
          pageContent: <Privacy />
        })
        break;

      default:

    }


  }

  render(){
    const { activeItem, pageContent} = this.state
    const { currentUser, loginToken } = this.props

    if(loginToken && !currentUser) return <Loading />

    // if(pageContent=='') {
    //   this.setState({pageContent : <General />})
    // }
    return(
      <Container>
        <Grid>
          <Grid.Column width={4}>
            <Menu vertical>

              <Menu.Item>

                General
                <Menu.Menu>
                  <Menu.Item name='personal' active={activeItem === 'personal'} onClick={this.handleItemClick.bind(this)}>
                    <Icon name='edit' />
                    Personal Details
                  </Menu.Item>
                  <Menu.Item name='password' active={activeItem === 'password'} onClick={this.handleItemClick.bind(this)}>
                    <Icon name='privacy' />
                  Change Password
                  </Menu.Item>
                </Menu.Menu>
              </Menu.Item>

              <Menu.Item name='privacy' active={activeItem === 'privacy'} onClick={this.handleItemClick.bind(this)}>
                <Icon name='eye' />
                Privacy
              </Menu.Item>
              <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick.bind(this)}>
                <Icon name='globe' />
                Site Setting
              </Menu.Item>

              <Dropdown item text='More'>
                <Dropdown.Menu>
                  <Dropdown.Item icon='edit' text='Edit Profile' />
                  <Dropdown.Item icon='globe' text='Choose Language' />
                  <Dropdown.Item icon='settings' text='Account Settings' />
                </Dropdown.Menu>
              </Dropdown>
            </Menu>
          </Grid.Column>
          <Grid.Column stretched width={12}>
            <Segment>
                {pageContent}
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default createContainer(() => {
  return { currentUser: Meteor.user(), loginToken: localStorage.getItem("Meteor.loginToken")  };
},Accounts);
