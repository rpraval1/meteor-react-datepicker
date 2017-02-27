import React, { Component } from 'react'
import {createContainer} from 'meteor/react-meteor-data';
import { Button, Container, Card, Grid } from 'semantic-ui-react'
import { Boards } from '../../collections/Boards'
import { Notes } from '../../collections/Notes'

class ManageBoards extends Component {

  // checkNotexLength(){
  //   const groupedNotes = _.groupBy(_.pluck(this.props.notes,'boardId'))
  //_.each(_.values(groupedNotes), function(groupedNote) {
  //   console.log(groupedNotes)
  //   return groupedNotes.map(groupedNote => {
  //     return (
  //       <li>{groupedNote.length}</li>
  //     )
  //   })
  //
  // }
  constructor(props){
    super(props)
    this.state = {
        boards: '',
        displayTextArea: ''
    }
  }

  // getBoardId(boardId){
  //   this.setState({
  //     boardId
  //   })
  // }
  componentWillMount(){
    //console.log("hello")
    Meteor.call('boards-summary',(error,result) => {
      if(error){
        console.log(error);
      }else {
        //console.log(result);
        this.setState({
          boards: result
        })
      }
    })

  }

  // shouldComponentUpdate(){
  //   alert('just updated my content')
  // }

  deleteBoard(boardId){
    Meteor.call('boards.remove', boardId, (error, result) => {
      if(error)
        console.log(error);
    })
  }

  toDisplayTextArea(boardId){
    alert("you hit edit")
    this.setState({
      displayTextArea: boardId
    })
  }

  saveBoard(boardId){
    alert('you hit save button')
    Meteor.call('boards.update', boardId, this.refs.boardName.value, (error, result) => {
      if(error)
        console.log(error);
    })
    this.setState({
      displayTextArea: ''
    })
  }

  generateBoardsAndNotes(){
    //const groupedNotes = _.groupBy(_.pluck(this.props.notes,'boardId'))
    const {boards,displayTextArea} = this.state
    console.log(boards);
    return boards.map(board => {
      return (
        <Grid.Column key={board._id}>
          <Card color='orange'>
            <Card.Header>
              <Button icon='close' size='mini' floated='right' color='red' onClick={this.deleteBoard.bind(this, board._id)} ></Button>
              <Button icon='edit' size='mini' floated='right' color='blue' onClick={this.toDisplayTextArea.bind(this, board._id)}></Button>
            </Card.Header>
            <Card.Content>
              {
                displayTextArea==board._id
                ?
                <textarea ref="boardName" defaultValue={board.boardName}></textarea>
                  :
                <h2>{board.boardName ? board.boardName : 'Please click edit on header to give board name.'}</h2>
              }
              <p>Number of Notes : {board.boardNotes.length}</p>
            </Card.Content>
            <Card.Content extra>
              {
                displayTextArea==board._id
                ?
                <Button basic color='blue' onClick={this.saveBoard.bind(this, board._id)}>Save</Button>
                :
                ''
              }
            </Card.Content>
          </Card>
        </Grid.Column>
      )
    })
  }
  render(){
    //console.log(this.props.boards.length)
    const {boards} = this.state
    if(!boards) return <div>loading</div>
    return (
      <Container fluid className='boardContent'>
        <Grid columns={6}>
          {this.generateBoardsAndNotes()}
        </Grid>
      </Container>
    );
  }
}

export default createContainer((props) => {
  //const {boardId} = this.state
  //Meteor.subscribe('boards-summary');
  //Meteor.subscribe('board-notes',boardId);

  return {
    //boards: Boards.find({}).fetch()
    //notes: Notes.find({}).fetch()
  };
}, ManageBoards)
