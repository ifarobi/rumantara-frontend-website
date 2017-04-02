import React, {Component} from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import {Link} from 'react-router';

import Menu from 'grommet/components/Menu';

import NavAnchor from '../../atoms/Anchor/Nav';

export default class Primary extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <Menu
        inline={true}
        responsive={true}
        direction='row'>
        <NavAnchor to="/host">Jadi Tuan Rumah</NavAnchor>
        <NavAnchor to="/help">Bantuan</NavAnchor>
        <NavAnchor to="/login">Masuk</NavAnchor>
      </Menu>
    )
  }
}
