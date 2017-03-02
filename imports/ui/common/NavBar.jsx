//import libraries
import React, {Component} from 'react';
import { Container, Menu } from 'semantic-ui-react'


//create component
class NavBar extends Component{
  constructor(props) {
    super(props);

    this.state = {
      activeItem:""
    }

    //console.log(props);
  }

  handleItemClick(e,{name}){
    this.setState({activeItem: name})
  }




  render(){
    const {activeItem} = this.state;

    return(
      <Container fluid>
          <Menu className="navbar">
            <Menu.Item href={Meteor.absoluteUrl()} className='navbarContent'>
              ExampleForm
            </Menu.Item>
            <Menu.Item className="navbarContent" href={Meteor.absoluteUrl('myFormData')} name='Manage Form Data' active={activeItem === 'features'} onClick={this.handleItemClick.bind(this)} />
          </Menu>
      </Container>
    );
  }
}

export default NavBar;
