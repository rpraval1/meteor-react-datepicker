import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'


class NoteColor extends Component {

  renderColor() {
    const {loadColor} = this.props
    const colors = ['pink', 'teal', 'olive', 'yellow']

    if(loadColor){
      return (
        colors.map(color => (
          <Menu.Item>
            <Segment inverted color={color}></Segment>
          </Menu.Item>
        ))
      )
    }
  }
  render(){

    return (
      <Menu borderless inverted attached='bottom'>
        {this.renderColor()}
      </Menu>
    );
  }

}

export default NoteColor;
