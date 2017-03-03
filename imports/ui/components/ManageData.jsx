import React, { Component } from 'react'
import {createContainer} from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Form, Header, Icon, Input, Grid, Modal, Table, Segment } from 'semantic-ui-react'
import { ExampleForm } from '../../collections/ExampleForm'

const options = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
]

class ManageData extends Component{

  constructor(props){
    super(props)
    this.state = {
      modalOpen: false,
      modalId: ""
    }
  }

  removeFormData(formId){

    Meteor.call('exampleforms.remove', formId, (error,result) => {
      if(error){
        console.log(error);
      }else{
        console.log('removed successfully');
      }
    });
  }

  saveEditData(formId,e, {formData}){
    e.preventDefault();
    console.log(formId)
    console.log(formData)
    Meteor.call('exampleforms.update', formId, formData, (error,result) => {
      if(error){
        console.log(error);
      }else{
        console.log('updated successfully');
      }
    });
  }

  handleItemClick(modalId){
    this.setState({
      modalId,
      modalOpen: true
    })
  }

  handleClose(){
    this.setState({
      modalOpen: false
    })
  }



  // renderEditDataMode(){
  //   const {formdata} = this.props
  //
  //   return (
  //       <Table.Body>
  //         {formdata.map(form => (
  //           <Table.Row as='form' key={form._id} onSubmit={this.saveEditData.bind(this, form._id)}>
  //             <Table.Cell>
  //               <Form.Input name="firstName" transparent  defaultValue ={form.firstName}/>
  //             </Table.Cell>
  //             <Table.Cell>
  //               <Form.Input name="lastName" transparent  defaultValue ={form.lastName}/>
  //             </Table.Cell>
  //             <Table.Cell>
  //               <Form.Input name="gender" transparent  defaultValue ={form.gender} />
  //             </Table.Cell>
  //             <Table.Cell>
  //               <Form.Input name="homePhone" transparent  defaultValue ={form.homePhone} />
  //             </Table.Cell>
  //             <Table.Cell>
  //               <Form.Input name="companyName" transparent  defaultValue ={form.companyName} />
  //             </Table.Cell>
  //             <Table.Cell>
  //               <Form.Input name="companyAddress" transparent  defaultValue ={form.companyAddress} />
  //             </Table.Cell>
  //             <Table.Cell>
  //               <Form.Input name="workPhone" transparent  defaultValue ={form.workPhone} />
  //             </Table.Cell>
  //             <Table.Cell>
  //               <Form.Input name="aboutYou" transparent  defaultValue ={form.aboutYou} />
  //             </Table.Cell>
  //             <Table.Cell>
  //               <Form.Button type='submit' >Save</Form.Button>
  //             </Table.Cell>
  //           </Table.Row>
  //         ))}
  //       </Table.Body>
  //   )
  //
  // }

  renderRetrieveDataMode(){
    const {formdata} = this.props
    const {modalId,modalOpen} = this.state
    return(
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
              <Modal
                trigger={<Button onClick={this.handleItemClick.bind(this, form._id)}>Edit</Button>}
                open={ modalId == form._id ? true : false}
                onClose={this.handleClose}
                size='small'
              >

                <Modal.Header><h1>Edit your Data</h1></Modal.Header>
                <Modal.Content>
                  <Form id={form._id} onSubmit={this.saveEditData.bind(this, form._id)}>
                    <Form.Group widths='equal'>
                      <Form.Input id="firstName" name='firstName' label='First name' defaultValue ={form.firstName} required type='text'/>
                      <Form.Input id='lastName' name='lastName' label='Last name' defaultValue ={form.lastName} required type='text'/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Select id='gender' name='gender' label='Gender' options={options} defaultValue ={form.gender} required/>
                      <Form.Input id='homePhone' name='homePhone' label='Home Phone' defaultValue ={form.homePhone} required type='text'/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Input id='companyName' name='companyName' label='Company Name' defaultValue ={form.companyName} required type='text'/>
                      <Form.Input id='companyAddress' name='companyAddress' label='Comapny Address' defaultValue ={form.companyAddress} required type='text'/>
                    </Form.Group>
                    <Form.Input id='workPhone' name='workPhone' label='Work Phone' defaultValue ={form.workPhone} required type='text'/>
                    <Form.TextArea id='aboutYou' name='aboutYou' label='About' defaultValue ={form.aboutYou} required type='text'/>
                    <Form.Group>
                      <Button primary type='submit'>Submit</Button>
                    </Form.Group>
                  </Form>
                </Modal.Content>
                <Modal.Actions>
                  <Button color='green' onClick={this.handleClose.bind(this)} inverted>
                    <Icon name='close' /> Close
                  </Button>
                </Modal.Actions>
              </Modal>
            <Button color='red' onClick={this.removeFormData.bind(this, form._id)}>Delete</Button>
          </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    )
  }


  render(){

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

            {this.renderRetrieveDataMode()}

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
