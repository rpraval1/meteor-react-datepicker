//import libraries
import React, {Component} from 'react';
import { Container, Menu } from 'semantic-ui-react'


//create component
class NavBar extends Component{
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     activeItem:""
  //   }
  //
  //   //console.log(props);
  // }
  //
  // handleItemClick(e,{name}){
  //   this.setState({activeItem: name})
  // }




  render(){

    return(
      <Container fluid>
          <Menu className="navbar">
            <Menu.Item href={Meteor.absoluteUrl()} className='navbarContent'>
              DatePickerExample
            </Menu.Item>
          </Menu>
      </Container>
    );
  }
}

export default NavBar;
