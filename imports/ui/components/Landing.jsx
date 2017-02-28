import React, { Component } from 'react'
import { Button,Card, Container, Grid, Icon, Menu, Message, Modal, Segment } from 'semantic-ui-react'

import SignIn from './SignIn';
import SignUp from './SignUp';

class Landing extends Component{
  constructor(props) {
    super(props);

    this.state = {
      //activeItem:'signup',
      signComponent:'signup',
      modalSignUp: false,
      modalSignIn: false,
    }
    //console.log(props);
  }

  handleItemClick(){
    this.setState({
      //activeItem: name,
      signComponent: name,
      modalSignUp: true})
  }
  handleModalClick(){
    this.setState({
      //activeItem: name,
      signComponent: name,
      modalSignIn: true})
  }

  // handleClose() {
  //   this.setState({
  //     modalOpen: false
  //   })
  // }
  render(){
    const {activeItem, signComponent} = this.state
    return(
      <Container fluid className="landingStyle">
        <Card centered className="registerCard">
          <Card.Content>
            <Modal trigger={<Button color='blue' basic onClick={this.handleItemClick.bind(this)}>SignUp</Button>}>
              <Modal.Content>
                <SignUp />
              </Modal.Content>
            </Modal>
            <Modal trigger={<Button color='blue' basic onClick={this.handleModalClick.bind(this)}>SignIn</Button>}>
              <Modal.Content>
                <SignIn />
              </Modal.Content>
            </Modal>
          </Card.Content>
        </Card>
      </Container>
    );
  }
}

export default Landing


// <Grid>
//
//   <Grid.Column width={6} stretched>
//     <div>
//       <Segment attached='top'>
//         {signComponent == 'signup' ? <SignUp /> : <SignIn />}
//       </Segment>
//
//       <Menu attached='bottom' tabular>
//         <Menu.Item name='signup' active={activeItem === 'signup'} onClick={this.handleItemClick.bind(this)}>
//           SignUp
//         </Menu.Item>
//         <Menu.Item name='signin' active={activeItem === 'signin'} onClick={this.handleItemClick.bind(this)}>
//           SignIn
//         </Menu.Item>
//       </Menu>
//     </div>
//   </Grid.Column>
// </Grid>
