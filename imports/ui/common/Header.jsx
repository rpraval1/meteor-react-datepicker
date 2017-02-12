//import libraries
import React, {Component} from 'react';
import {createContainer} from 'meteor/react-meteor-data';

import NavBar from './NavBar';

//create component
class Header extends Component {

  render(){
    return(
      <NavBar />
    );
  }

}

export default Header;
