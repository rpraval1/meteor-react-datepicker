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
      inputDate: ''
    };
  }

  handleinputDate(date){
    this.setState({
      inputDate: date
    })
  }

  handleSubmit(e, {formData}){
    e.preventDefault();
    Meteor.call('date.save', formData, (error, result) => {
      if(error){
        console.log(error);

      }else{
        this.setState({
          inputDate: ''
        })
      }

    });
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
          <Form id="addDate" onSubmit={this.handleSubmit.bind(this)}>
            <Form.Group>
              <Form.Input id='inputDate' label='Select a Date' required>
                <DatePicker
                  selected={inputDate}
                  name='myDate'
                  onChange={this.handleinputDate.bind(this)} />
              </Form.Input>
              <Button primary type='submit'>Select</Button>
            </Form.Group>
          </Form>
        </Segment>
      </Container>
    );
  }
}

export default DateInput;
