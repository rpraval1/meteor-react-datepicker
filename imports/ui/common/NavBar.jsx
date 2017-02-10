//import libraries
import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import { Container, Dropdown, Icon, Input, Menu } from 'semantic-ui-react'
import { browserHistory } from 'react-router';

import Loading from './NavLoading';

//create component
class NavBar extends Component{
  constructor(props) {
    super(props);

    this.state = {activeItem:""}
    this.logout = this.logout.bind(this);
    //console.log(props);
  }
  handleItemClick(e,{name}){
    this.setState({activeItem: name})
  }
  logout(e){
    e.preventDefault();
    Meteor.logout();
    browserHistory.push('/');
  }

  render(){
    const { currentUser, children, base_url, loginToken} = this.props;
    const {activeItem} = this.state;
    let trigger = '';

    if(loginToken && !currentUser) return <Loading />
    else if(loginToken && currentUser)
    {
      trigger = (
          <span>
            <Icon name='user' />
            Hello, {currentUser.profile.name}
          </span>
        );
    }



  return(
    <div>
      { loginToken ?
        <Menu className="navbar">
          <Menu.Item>
            <img src="/img/logo.png" width="30" height="30" className="d-inline-block align-top " alt="" />
            STORYOF.MY
          </Menu.Item>
          <Menu.Item href={`${base_url}`} name='Home' active={activeItem === 'features'} onClick={this.handleItemClick.bind(this)} />
          <Menu.Item name='Messsages' active={activeItem === 'settings'} onClick={this.handleItemClick.bind(this)} />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item>
              <Dropdown trigger={trigger}>
                <Dropdown.Menu className="user-dropdown">
                  <Dropdown.Item disabled>
                    Signed in as <strong>{currentUser.username}</strong>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href={`${base_url}account`}>Your Account</Dropdown.Item>
                  <Dropdown.Item>Integrations</Dropdown.Item>
                  <Dropdown.Item>Help</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href={`${base_url}settings`}>Settings</Dropdown.Item>
                  <Dropdown.Item onClick={this.logout.bind(this)}>Sign Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>

          </Menu.Menu>
      </Menu>
         :
         <Menu className="navbar">
           <Menu.Item>
             <img src="/img/logo.png" width="30" height="30" className="d-inline-block align-top " alt="" />
             STORYOF.MY
           </Menu.Item>
           <Menu.Menu position='right'>
         <Menu.Item href='/signup' name='signup' active={activeItem === 'signup'} onClick={this.handleItemClick.bind(this)}>
           Sign Up
         </Menu.Item>

         <Menu.Item href='/signin' name='signin' active={activeItem === 'signin'} onClick={this.handleItemClick.bind(this)}>
           Sign In
         </Menu.Item>
       </Menu.Menu>
        </Menu>
      }
    </div>
      );
  }
}

export default createContainer(() => {
  return { currentUser: Meteor.user(), loginToken: localStorage.getItem("Meteor.loginToken")  };
},NavBar);
