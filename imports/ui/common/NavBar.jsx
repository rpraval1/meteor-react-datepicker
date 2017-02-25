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

    this.state = {
      activeItem:"",
      isUserAdmin: false
    }

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

  // componentDidMount(){
  //   Meteor.call('isAdmin', (err, isUserAdmin) => {
  //     if(err) {
  //       // Handle error
  //       console.log(err);
  //     }
  //     else {
  //       this.setState({
  //           isUserAdmin
  //       })
  //       console.log('componentDidMount: admin menu should have been re-rendered');
  //     }
  //   });
  // }

  componentWillReceiveProps(){
    //if(this.props != nextProps)
    Meteor.call('isAdmin', (err, isUserAdmin) => {
      if(err) {
        // Handle error
        console.log(err);
      }
      else {
        this.setState({
          isUserAdmin
        })
      }
    });

  }


  render(){
    const { currentUser, children, base_url, loginToken} = this.props;
    const {activeItem, isUserAdmin} = this.state;
    let trigger = '';
    let adminTrigger = '';

    if(loginToken && !currentUser) return <Loading />
    else if(loginToken && currentUser)
    {
      trigger = (
          <span>
            <Icon name='user' />
            Hello, {currentUser.profile.name}
          </span>
        );

      adminTrigger = (
          <span>
            <Icon name='spy' />
            Admin
          </span>
        );

    }

    //
    // <Menu.Item>
    //   <Input icon='search' placeholder='Search...' />
    // </Menu.Item>
  return(
    <div>
      { loginToken ?
        <Menu className="navbar">
          <Menu.Item href={Meteor.absoluteUrl()}>
            BulletinBoard
          </Menu.Item>
          <Menu.Item href={Meteor.absoluteUrl('myboards')} name='MyBoards' active={activeItem === 'features'} onClick={this.handleItemClick.bind(this)} />
        <Menu.Menu position='right'>
            {isUserAdmin ?
              <Menu.Item >
                <Dropdown trigger={adminTrigger}>
                  <Dropdown.Menu className="user-dropdown">
                    <Dropdown.Item disabled>
                      Signed in as <strong>Admin</strong>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href={Meteor.absoluteUrl('manage/users')}>Manage Users</Dropdown.Item>
                    <Dropdown.Item href={Meteor.absoluteUrl('manage/roles')}>Manage Roles</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            : null}

            <Menu.Item>
              <Dropdown trigger={trigger}>
                <Dropdown.Menu className="user-dropdown">
                  <Dropdown.Item disabled>
                    Signed in as <strong>{currentUser.username}</strong>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href={Meteor.absoluteUrl('account')}>Your Account</Dropdown.Item>
                  <Dropdown.Item>Integrations</Dropdown.Item>
                  <Dropdown.Item>Help</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href={Meteor.absoluteUrl('settings')}>Settings</Dropdown.Item>
                  <Dropdown.Item onClick={this.logout.bind(this)}>Sign Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>

          </Menu.Menu>
      </Menu>
         :
         <Menu className="navbar">
           <Menu.Item>
             BulletinBoard
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


  return {
    currentUser: Meteor.user(),
    loginToken: localStorage.getItem("Meteor.loginToken")
  };

},NavBar);
