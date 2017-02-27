import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data';
import { Container, Card } from 'semantic-ui-react'
import { Notes } from '../../collections/Notes'
import { Boards } from '../../collections/Boards'

class BoardContent extends Component {

  // constructor(props){
  //   super(props)
  //   this.state = {
  //     noteColorValue: ''
  //   }
  // }
  //
  renderNotes(){

    return this.props.notes.map(note => {
      return (
        <Card key={note._id} color={note.color}>
          <h2>{note._id}</h2>
          <h2>{note.color}</h2>
        </Card>
      )
    })
  }

  render (){
    const {boardId, notes} = this.props
    //const {noteColorValue} = this.state
    //console.log(notes);
    return (
      <Container fluid className='boardContent'>
        {this.renderNotes()}
      </Container>
    );
  }
}

export default createContainer((props) => {
  const {boardId} = props
  Meteor.subscribe('boards');
  Meteor.subscribe('board-notes',boardId);

  return {
    boards: Boards.find({}).fetch(),
    notes: Notes.find({}).fetch()
  };
}, BoardContent)
