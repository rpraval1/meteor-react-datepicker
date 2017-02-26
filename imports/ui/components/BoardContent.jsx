import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data';
import { Container } from 'semantic-ui-react'

import { Boards } from '../../collections/Boards'

class BoardContent extends Component {

  // constructor(props){
  //   super(props)
  //   this.state = {
  //     noteColorValue: ''
  //   }
  // }
  //


  render (){
    const {boardContent, noteColorValue} = this.props
    //const {noteColorValue} = this.state
    return (
      <Container fluid className='boardContent'>
        <h1>{boardContent}</h1>
        <h1>{noteColorValue}</h1>
      </Container>
    );
  }
}

export default createContainer((props) => {
  Meteor.subscribe('boards');
  return {boards: Boards.find({}).fetch()};
}, BoardContent)
