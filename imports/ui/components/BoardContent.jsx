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
  // getNoteColorValue(noteInputColor){
  //   this.setState({
  //     noteColorValue: noteInputColor
  //   })
  // }

  render (){
    const {boardContent} = this.props
    //const {noteColorValue} = this.state
    return (
      <Container fluid className='boardContent'>
        <h1>{boardContent}</h1>
      </Container>
    );
  }
}

export default createContainer((props) => {
  Meteor.subscribe('boards');
  return {boards: Boards.find({}).fetch()};
}, BoardContent)
