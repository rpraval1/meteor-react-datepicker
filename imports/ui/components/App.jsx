//import libraries
import React, {Component} from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

//create component
class App extends Component {

  render(){
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
