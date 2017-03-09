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
      if (moment(date.myDate).format('YYYY-MM-DD') == moment().utcOffset("-5:00").format('YYYY-MM-DD')) {
        return (
          <Message key={date._id} onDismiss={this.handleDismiss.bind(this, date._id)} info>
            <Message.Header>Selected Date : {moment().utcOffset("-5:00").toString()}</Message.Header>
            <Message.List>
              <Message.Item>Date and Time : {moment().utcOffset("-5:00").format('LLLL')}</Message.Item>
              <Message.Item>Calendar Date : {moment().utcOffset("-5:00").format('LL')}</Message.Item>
              <Message.Item>Day of the week : {moment().utcOffset("-5:00").format('dddd')}</Message.Item>
              <Message.Item>{moment().utcOffset("-5:00").format('LTS')}</Message.Item>
              <Message.Item>{moment().utcOffset("-5:00").format('l')}</Message.Item>
              <Message.Item>{moment().utcOffset("-5:00").format('YYYY-MM-DD')}</Message.Item>
            </Message.List>
          </Message>
        )
      }
      else{
        return (
          <Message key={date._id} onDismiss={this.handleDismiss.bind(this, date._id)} info>
            <Message.Header>Selected Date : {moment(date.myDate).utcOffset("-5:00").toString()}</Message.Header>
            <Message.List>
              <Message.Item>Date and Time : {moment(date.myDate).utcOffset("-5:00").format('LLLL')}</Message.Item>
              <Message.Item>Calendar Date : {moment(date.myDate).utcOffset("-5:00").format('LL')}</Message.Item>
              <Message.Item>Day of the week : {moment(date.myDate).utcOffset("-5:00").format('dddd')}</Message.Item>
              <Message.Item>{moment(date.myDate).utcOffset("-5:00").format('LTS')}</Message.Item>
              <Message.Item>{moment(date.myDate).utcOffset("-5:00").format('l')}</Message.Item>
              <Message.Item>{moment(date.myDate).utcOffset("-5:00").format('YYYY-MM-DD')}</Message.Item>
            </Message.List>
          </Message>
        )
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

        {moment().utcOffset("-5:00").format('YYYY-MM-DD HH:mm:ss')}

        {this.renderSavedDates()}

      </Container>
    );
  }
}

export default createContainer((props) => {
  Meteor.subscribe('getDates');
  return {
    dates: Dates.find({}, {sort: {createdAt: -1}}).fetch()
  };
},DateInput);
