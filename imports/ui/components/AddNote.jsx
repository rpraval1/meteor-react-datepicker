import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import NoteColor from './NoteColor'

class AddNote extends Component {

  constructor(props){
    super(props)

    this.state = {
      activeItem: '',
      loadColor: false
    }
  }
  handleItemClick(e, { name }){

    const {loadColor} = this.state
    if(loadColor) {
      this.setState({
        activeItem: name,
        loadColor: false  })
    }
    else{
    this.setState({
      activeItem: name,
      loadColor: true  })
    }
  }


  render(){

    const {activeItem,loadColor} = this.state
    return (
        <Menu inverted borderless className='addNote'>
          <Menu.Item name='plus' active={activeItem === 'plus'} onClick={this.handleItemClick.bind(this)} >
            {loadColor ? <Icon name='minus'></Icon> : <Icon name='plus'></Icon>}
          </Menu.Item>
          <NoteColor loadColor={loadColor}/>
        </Menu>
    );
  }
}

export default AddNote;
