import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor';
import { Button, Container, Header, Form, Icon, Input, Segment } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment';
import { Dates } from '../../collections/Dates'
require('react-datepicker/dist/react-datepicker.css');

class DateInput extends Component{
  constructor(props){
    super(props);
    this.state = {
      inputDate: moment()
    };
  }

  handleinputDate(date){
    this.setState({
      inputDate: date
    })
  }

  saveDate(){
    Meteor.call('date.save', this.refs.myDate.value, (error, result) => {
      if(error){
        console.log(error);

      }else{
        console.log(result);
        console.log("date inserted");
      }
    })
  }

  render(){
    const {inputDate} = this.state
    return(
      <Container>
        <Header as='h3'>
          <Icon name='settings' />
          <Header.Content>
            React DatePicker and DateFormats
          </Header.Content>
        </Header>
        <Segment raised>
          <DatePicker
            selected={inputDate}
            ref= 'myDate'
            onChange={this.handleinputDate.bind(this)} />
          <Button onClick={this.saveDate.bind(this)}>Add</Button>
        </Segment>
      </Container>
    );
  }
}

export default DateInput;
