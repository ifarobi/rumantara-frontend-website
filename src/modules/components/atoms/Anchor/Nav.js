import React, {Component} from 'react';

import { Link } from 'react-router';

import Anchor from 'grommet/components/Anchor';

import Style from './styles/Nav.css';

const Nav = (props) => {
  const primary = (typeof props.primary != 'undefined') ? props.primary : false;
  return (
    <Link className={Style.navText} to={props.to}>
      <Anchor
        tag="span"
        primary={primary}>
        {props.children}
      </Anchor>
    </Link>
  );
};

Nav.propTypes = {
  to: React.PropTypes.string.isRequired
}

export default Nav;
