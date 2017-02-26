import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data';
import { Container } from 'semantic-ui-react'
import AddNote from './AddNote'
import { Boards } from '../../collections/Boards'

class BoardContent extends Component {

  // renderBoardContent(){
  //   console.log(boardContent)
  // }
  render (){
    const {boardContent} = this.props
    return (
      <Container fluid className='boardContent'>
        <h1>{boardContent}</h1>
        <AddNote />
      </Container>
    );
  }
}

export default createContainer((props) => {
  Meteor.subscribe('boards');
  return {boards: Boards.find({}).fetch()};
}, BoardContent)
