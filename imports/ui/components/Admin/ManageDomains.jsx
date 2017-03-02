import React, { Component } from 'react'
import {createContainer} from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Header, Form, Icon, Input, Grid, Table, Segment } from 'semantic-ui-react'
import Loading from '../Loading';
import { Domains } from '../../../collections/Domains'

const options = [
  { key: 'y', text: 'Yes', value: 'yes' },
  { key: 'f', text: 'No', value: 'no' },
]

class ManageDomains extends Component{
  constructor(props){
    super(props);
    this.state = {
      error: '',
      success: false,
      visible:false,
      loading: false,
      formerror: false
    };
  }

  handleSubmit(e,{formData}){
    e.preventDefault();
    this.setState({loading: true})

    //validate
    Meteor.call('domains.save', formData, function(error){
      if(error){
        //console.log(error.reason);
        this.setState({error:error.reason, visible:true, formerror: true})
      } else {
        // reload table ....
        this.setState({
          success: true,
          error:''
        })
        //document.getElementById('role').children[0].value = "";
        document.getElementById("addDomain").reset();

      }

      this.setState({loading: false})
    }.bind(this))

  }



  render(){
    const { currentUser, loginToken, allDomains } = this.props
    const {error,loading, formerror, success} = this.state;

    if(loginToken && !currentUser) return <Loading />
    //console.log(allRoles);
    return(
      <Container>
        <Header as='h3'>
          <Icon name='settings' />
          <Header.Content>
            Manage Domains
            <Header.Subheader>
              Manage all your Domains here
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Segment raised>
          <Header as='h3'>Add/Edit Domain</Header>
        <Form id="addDomain" onSubmit={this.handleSubmit.bind(this)} loading={loading} error={formerror}>
            <Form.Group widths='equal'>
              <Form.Input inline id="domainUrl" name='domainUrl' label='Enter Domain Url' required type='url'/>
              <Form.Select inline id="isActive" name='isActive' options={options} required label='Is Active'/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input inline id="docName" name='docName' label='Document Name' required type='text'/>
              <Form.Input inline id="document" name='document' label='Doc Link' required type='url'/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input inline id="adminLink" name='adminLink' label='Admin Link' required type='url'/>
              <Form.Input inline id="renewLink" name='renewLink' label='Renew Link' required type='url'/>
            </Form.Group>
            <Form.Group>
              <Button primary type='submit'>Submit</Button>
            </Form.Group>
          </Form>

          <Table color='blue' >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Domain Url</Table.HeaderCell>
                <Table.HeaderCell>Is Active</Table.HeaderCell>
                <Table.HeaderCell>Document</Table.HeaderCell>
                <Table.HeaderCell>Admin</Table.HeaderCell>
                <Table.HeaderCell>Renew</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {allDomains.map(domain => (
                <Table.Row key={domain._id}>
                <Table.Cell>
                  <a href={domain.domainUrl}>{domain.domainUrl}</a>
                </Table.Cell>
                <Table.Cell>{domain.isActve}</Table.Cell>
                <Table.Cell>
                  <a href={domain.document}>{domain.docName}</a>
                </Table.Cell>
                <Table.Cell>
                  <a href={domain.adminLink}>{domain.adminLink}</a>
                </Table.Cell>
                <Table.Cell>
                  <a href={domain.renewLink}>{domain.renewLink}</a>
                </Table.Cell>
                <Table.Cell>Edit/Delete</Table.Cell>
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
  Meteor.subscribe('domains');

  return {
    currentUser: Meteor.user(),
    allDomains: Domains.find({}).fetch(),
    loginToken: localStorage.getItem("Meteor.loginToken")
  };
},ManageDomains);
