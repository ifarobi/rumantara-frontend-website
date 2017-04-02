import React, {Component} from 'react';
import { Link } from 'react-router';

// migrate to grommet
import App from 'grommet/components/App';

class Root extends Component{
  render(){
    return (
      <App centered={false}>
          {this.props.children}
      </App>
    )
  }
}

export default Root;
