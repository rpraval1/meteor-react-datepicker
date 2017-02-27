import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data';
import { Button, Container, Card, Grid } from 'semantic-ui-react'
import { Notes } from '../../collections/Notes'
import { Boards } from '../../collections/Boards'
import Draggable from 'react-draggable'

class BoardContent extends Component {
  constructor(props){
    super(props)
    this.state = {
      displayTextArea: ''
    }
  }

  toDisplayTextArea(noteId){
    this.setState({
      displayTextArea: noteId
    })
  }

  saveNote(noteId){
    Meteor.call('notes.update', noteId, this.refs.newText.value, (error,result) => {
      if(error){
        console.log(error)
      }
    })

    this.setState({
      displayTextArea: ''
    })
  }

  renderNotes(){

    const {displayTextArea} = this.state

    return this.props.notes.map(note => {
      return (
        <Grid.Column>
          <Card key={note._id} color={note.color}>
            <Card.Header>
              <Button icon='close' floated='right' basic color='red'></Button>
            </Card.Header>
            <Card.Content onClick={this.toDisplayTextArea.bind(this,note._id)}>
              {
                displayTextArea==note._id
                ?
                <textarea ref="newText"></textarea>
                  :
                <h2>{note.content ? note.content : 'Start wrtiting'}</h2>
              }
            </Card.Content>
            <Card.Content extra>
              {
                displayTextArea==note._id
                ?
                <Button basic color='blue' onClick={this.saveNote.bind(this, note._id)}>Save</Button>
                :
                ''
              }
            </Card.Content>
          </Card>
        </Grid.Column>
      )
    })
  }

  render (){
    const {boardId, notes} = this.props
    //const {noteColorValue} = this.state
    //console.log(notes);
    return (
      <Container fluid className='boardContent'>
        <Grid columns={6}>
          {this.renderNotes()}
        </Grid>
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
