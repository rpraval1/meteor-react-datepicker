import React, { Component } from 'react'
import {createContainer} from 'meteor/react-meteor-data';
import { Button, Icon, Menu } from 'semantic-ui-react'
import { Boards } from '../../collections/Boards'

class MyBoardsList extends Component {

  constructor(props){
    super(props)


    if(props.boards.length > 0){
      this.state = {
        activeItem: props.boards[0].boardName
      }
      // activeTab = this.props.boards[0].boardName
    } else{
      this.state = {
        activeItem: ''
      }
    }
  }

  /***
   * On load first Board should be selected and display its content
   * But we do not have Boards list and Board data as it is invoked by click
   * Here we need the props before invoking handleItemClick
   * Hence componentWillReceiveProps(nextProps){} is used
   * https://facebook.github.io/react/docs/react-component.html#componentwillreceiveprops
   */
  componentWillReceiveProps(nextProps){
    if(nextProps.boards.length > this.props.boards.length){
      this.setState({
        activeItem: nextProps.boards[0].boardName
      })
      nextProps.boardContentValue(nextProps.boards[0]._id)
    }
  }

  handleItemClick(boardName,boardId){
    this.setState({
      activeItem: boardName,
    })
    this.props.boardContentValue(boardId)
  }

  renderBoards(){
    const {activeItem,boardContent} = this.state
    // activeTab = activeItem
    return this.props.boards.map(board => {
      return (
        <Menu.Item key={board._id} name={board.boardName} active={activeItem === board.boardName} onClick={this.handleItemClick.bind(this, board.boardName, board._id)}>
          {board.boardName}
          <Button icon='close' className='btn-small btn-olive'></Button>
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
