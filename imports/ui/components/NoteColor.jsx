import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Boards } from '../../collections/Boards'
import {createContainer} from 'meteor/react-meteor-data';


class NoteColor extends Component {

  // sendNoteColor(color){
  //   this.props.getNoteColor(color)
  // }

  renderColor() {
    const {loadColor} = this.props
    const colors = ['pink', 'teal', 'olive', 'yellow']

    if(loadColor){
      return (
        colors.map(color => (
          <Menu.Item>
            <Segment inverted color={color} ></Segment>
          </Menu.Item>
        ))
      )
    }

    // if(loadColor) {
    //   return this.props.boards.map(board => {
    //     return board.noteColors.map(color => {
    //       return (
    //         <Menu.Item>
    //           <Segment inverted color={color} onClick={this.sendNoteColor.bind(this,color)}></Segment>
    //         </Menu.Item>
    //       )
    //     })
    //   })
    //
    // }
  }
  render(){

    return (
      <Menu borderless inverted attached='bottom'>
        {this.renderColor()}
      </Menu>
    );
  }

}

export default createContainer((props) => {
  Meteor.subscribe('boards');
  return {boards: Boards.find({}).fetch()};
}, NoteColor)
