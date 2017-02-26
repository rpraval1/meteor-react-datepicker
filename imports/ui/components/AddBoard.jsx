import React, { Component } from 'react'
import { Button, Container, Header, Icon, Menu, Modal, Segment } from 'semantic-ui-react'
import BoardContent from './BoardContent'
import AddNote from './AddNote'
import MyBoardsList from './MyBoardsList'

class AddBoard extends Component {

  // constructor(props){
  //   super(props);
  //
  //   this.state = {
  //     createBoardMenu: false
  //   }
  // }
  //
  // handleItemClick(e,{name}){
  //   this.setState({
  //     createBoardMenu: true
  //   })
  //
  // }
  constructor(props){
    super(props)

    this.state = {
      modalOpen: false,
      boardContent: '',
      noteColorValue: ''
    }
  }

  handleItemClick(){
    this.setState({
      modalOpen: true
    })
  }

  boardContentValue(boardClickedVaue, noteColorValue){
    this.setState({
      boardContent: boardClickedVaue,
      noteColorValue
    })
  }

  getNoteColorValue(noteInputColor){
    this.setState({
      noteColorValue: noteInputColor
    })
  }

  handleClose(){


      Meteor.call('boards.insert', this.refs.BoardName.value ,(error, result) => {
        if(error){
          console.log(error)
        }
        else{
          console.log("yippee added")
        }
      });
      this.setState({
        modalOpen: false
      })
    }

  // <Menu.Item name='plus' onClick={this.handleItemClick.bind(this)}>
  //   <Icon name='plus'></Icon>
  render() {

    const {modalOpen, boardContent, noteColorValue} = this.state

    return(
      <Container fluid>
        <Menu inverted attached='top' tabular>
          <Menu.Item>
            <Modal
              trigger={<Button icon onClick={this.handleItemClick.bind(this)}><Icon name='plus'/></Button>}
              open={this.state.modalOpen}
              onClose={this.handleClose}
              size='small'
            >
              <Modal.Header><h1>Create a Bulletin Board</h1></Modal.Header>
              <Modal.Content>
                <input type="text" ref="BoardName" placeholder='Create Board' className='boardText'></input>
              </Modal.Content>
              <Modal.Actions>
                <Button color='green' onClick={this.handleClose.bind(this)} inverted>
                  <Icon name='save' /> Save
                </Button>
              </Modal.Actions>
            </Modal>
          </Menu.Item>
          <MyBoardsList boardContent={boardContent} noteColorValue={noteColorValue} boardContentValue={this.boardContentValue.bind(this)}/>
        </Menu>
        <Segment attached='bottom'>
          <BoardContent boardContent={boardContent} noteColorValue={noteColorValue} />
          {boardContent ? <AddNote boardContent={boardContent} getNoteColorValue={this.getNoteColorValue.bind(this)}/> : ''}
        </Segment>
      </Container>
    );
  }
}

export default AddBoard;
