import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor';
import { Button, Container, Header, Form, Icon, Input, Segment } from 'semantic-ui-react'
import { Dates } from '../../collections/Dates'


class DateInput extends Component{
  constructor(props){
    super(props);
    this.state = {

    };
  }





  render(){

    return(
      <Container>
        <Header as='h3'>
          <Icon name='settings' />
          <Header.Content>
            React DatePicker and DateFormats
          </Header.Content>
        </Header>
        <Segment raised>
        </Segment>
      </Container>
    );
  }
}

export default DateInput;
