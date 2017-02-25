import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import AddNote from './AddNote'

class BoardContent extends Component {
  render (){
    return (
      <Container fluid className='boardContent'>
        <h1>Hello Iam attached</h1>
        <AddNote />
      </Container>
    );
  }
}

export default BoardContent;
