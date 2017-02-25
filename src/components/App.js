import React, {Component} from 'react';
import { Link } from 'react-router';

class App extends Component{
  render(){
    return (
      <div>
        <div>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/messages">Messages</Link>
        </div>
        {this.props.children || <h2>Hello from Home</h2>}
      </div>
    )
  }
}

export default App;
