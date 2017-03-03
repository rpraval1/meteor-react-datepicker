import React, { Component } from 'react'
import {createContainer} from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Header, Icon, Grid, Table, Segment } from 'semantic-ui-react'
import { ExampleForm } from '../../collections/ExampleForm'


class ManageData extends Component{

  removeFormData(formId){

    Meteor.call('exampleforms.remove', formId, (error,result) => {
      if(error){
        console.log(error);
      }else{
        console.log('removed successfully');
      }
    });
  }

  render(){
    const {formdata} = this.props
    return(
      <Container>
        <Header as='h3'>
          <Icon name='settings' />
          <Header.Content>
            Manage formData
            <Header.Subheader>
              Edit and Delete your Data
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Segment raised>

          <Table color='blue' >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>First Name</Table.HeaderCell>
                <Table.HeaderCell>Last Name</Table.HeaderCell>
                <Table.HeaderCell>Gender</Table.HeaderCell>
                <Table.HeaderCell>Home Phone</Table.HeaderCell>
                <Table.HeaderCell>Company Name</Table.HeaderCell>
                <Table.HeaderCell>Comapany Address</Table.HeaderCell>
                <Table.HeaderCell>Work Phone</Table.HeaderCell>
                <Table.HeaderCell>About You</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {formdata.map(form => (
                <Table.Row key={form._id}>
                <Table.Cell>{form.firstName}</Table.Cell>
                <Table.Cell>{form.lastName}</Table.Cell>
                <Table.Cell>{form.gender}</Table.Cell>
                <Table.Cell>{form.homePhone}</Table.Cell>
                <Table.Cell>{form.companyName}</Table.Cell>
                <Table.Cell>{form.companyAddress}</Table.Cell>
                <Table.Cell>{form.workPhone}</Table.Cell>
                <Table.Cell>{form.aboutYou}</Table.Cell>
                <Table.Cell>
                  <Button>Edit</Button>
                  <Button color='red' onClick={this.removeFormData.bind(this, form._id)}>Delete</Button>
                </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>
      </Container>
    );
  }
}

export default createContainer((props) => {

  //Lets subscribe to check if user is admin
  Meteor.subscribe('get-all-data');

  return {
    formdata: ExampleForm.find({}).fetch()
  };
},ManageData);
