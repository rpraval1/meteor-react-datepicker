//import libraries
import React, {Component} from 'react';
import {render} from 'react-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { browserHistory } from 'react-router'

//create component
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isUserAdmin: false
    }

  }

  //Adding extra layer for authorization based route access
  componentWillMount(){
    if(this.props.children.props.route.roles){
      let role = this.props.children.props.route.roles[0]
      let group = this.props.children.props.route.group
      //console.log(group);
      Meteor.call('userIsInRoleWithGroup',role,group,(err, allowAccess)=>{
        if(err){
          //something went wrong....

        } else {
          // if no access then rediect to home page
          if(!allowAccess){
            browserHistory.push('/');
          }
        }
      });
    }

  }

  render(){

    //console.log(this.base_url);
    //console.log(this.props.children.props.route.authorize);
    return(
      <div>
        <Header />
          {this.props.children}
        <Footer />
      </div>

    );
  }

}

export default App;
