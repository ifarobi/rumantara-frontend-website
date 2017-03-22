import React, {Component} from 'react';
import { Link } from 'react-router';
import Nav from './Nav';

// migrate to grommet
import App from 'grommet/components/App';

class Root extends Component{
  render(){
    return (
      <App>
          {this.props.children}
      </App>
    )
  }
}

export default Root;
