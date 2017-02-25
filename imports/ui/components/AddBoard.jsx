import React, { Component } from 'react'
import { Container, Icon, Menu, Segment } from 'semantic-ui-react'
import BoardContent from './BoardContent'

class AddBoard extends Component {

  constructor(props){
    super(props);

    this.state = {
      activeItem: ''
    }
  }

  handleItemClick(e,{name}){
    this.setState({activeItem: name})
  }

  render() {

    const {activeItem} = this.state

    return(
      <Container fluid>
        <Menu inverted attached='top' tabular>
          <Menu.Item name='plus' onClick={this.handleItemClick.bind(this)}>
            <Icon name='plus'></Icon>
          </Menu.Item>
          <Menu.Item name='Board1' active={activeItem === 'Board1'} onClick={this.handleItemClick.bind(this)}>
          </Menu.Item>
        </Menu>
        <Segment attached='bottom'><BoardContent /></Segment>
      </Container>
    );
  }
}

export default AddBoard;
