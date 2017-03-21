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
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Rumantara</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight={true}>
          <NavItem eventKey={1} componentClass={Link} href="/host" to="/host">Menjadi Tuan Rumah</NavItem>
          {/*<NavItem eventKey={2} componentClass={Link} href="/explore" to="/explore">Jelajahi</NavItem>*/}
          <NavItem eventKey={3} componentClass={Link} href="/register" to="/register">Daftar</NavItem>
          <NavItem eventKey={4} componentClass={Link} href="/login" to="/login">Masuk</NavItem>
        </Nav>
      </Navbar>
    )
  }
}
