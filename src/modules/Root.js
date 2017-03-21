import React, {Component} from 'react';
import { Link } from 'react-router';
import Nav from './Nav';

// migrate to grommet

class Root extends Component{
  render(){
    return (
      <div>
          <Nav/>
          {this.props.children}
      </div>
    )
  }
}

export default Root;
