import React, {Component} from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import {Link} from 'react-router';

export default class Sidebar extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedNav : 1
    }
    this.onSelectHandler = this.onSelectHandler.bind(this);
  }
  onSelectHandler = (selectedKey) => {
    this.setState({
      selectedNav: selectedKey
    })
  }
  render(){
    return (
      <nav>
        
      </nav>
    )
  }
}
