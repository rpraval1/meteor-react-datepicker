import React, { Component } from 'react'
import {createContainer} from 'meteor/react-meteor-data';
import { Button, Icon, Menu } from 'semantic-ui-react'
import { Boards } from '../../collections/Boards'

class MyBoardsList extends Component {

  constructor(props){
    super(props)

    this.state = {
      activeItem: ''

    }
  }

  handleItemClick(boardName,boardId){
    this.setState({
      activeItem: boardName,
    })
    this.props.boardContentValue(boardId,'')
  }

  renderBoards(){
    const {activeItem,boardContent} = this.state
    return this.props.boards.map(board => {
      return (
        <Menu.Item key={board._id} name={board.boardName} active={activeItem === board.boardName} onClick={this.handleItemClick.bind(this, board.boardName, board._id)}>
          {board.boardName}
          <Button icon color='black' size='tiny'><Icon name='delete'></Icon></Button>
        </Menu.Item>
      )
    })
  }

  render(){
    return(
      <Menu attached='top' inverted>
        {this.renderBoards()}
      </Menu>
    );
  }
}

export default createContainer((props) => {
  Meteor.subscribe('boards');
  return {boards: Boards.find({}).fetch()};
}, MyBoardsList)
