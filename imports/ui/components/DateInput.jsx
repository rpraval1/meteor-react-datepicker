import React, { Component } from 'react'
import {createContainer} from 'meteor/react-meteor-data'
import { Meteor } from 'meteor/meteor';
import { Button, Container, Header, Form, Icon, Input, Message, Segment } from 'semantic-ui-react'
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
  handleDismiss(dateId){
    Meteor.call('date.remove', dateId, (error, result) => {
      if(error){
        console.log(error);
      }else{
        console.log("removed Successfully");
      }
    })
  }

  renderSavedDates(){
    const {dates} = this.props

    return dates.map(date => {
      /***
      * moment().toString() is used to convert moment date object to string
      * React do not encourage rendering objects directly in jsx
      */
      return (
        <Message key={date._id} onDismiss={this.handleDismiss.bind(this, date._id)}>
          <Message.Header>Selected Date : {moment(date.myDate).toString()}</Message.Header>
          <Message.List>
            <Message.Item>After Removing Timestamp : {moment(date.myDate).format('LL').toString()}</Message.Item>
          </Message.List>
        </Message>
      )
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

        {this.renderSavedDates()}

      </Container>
    );
  }
}

export default createContainer((props) => {
  Meteor.subscribe('getDates');
  return {
    dates: Dates.find({}).fetch()
  };
},DateInput);
