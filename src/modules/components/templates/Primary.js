import React, { Component } from 'react';

import Box from 'grommet/components/Box';

import HeaderPrimary from '../organisms/Header/Primary';

class Primary extends Component {
  render() {
    return(
      <div>
        <HeaderPrimary/>
        {this.props.children}
      </div>
    )
  }
}

export default Primary;
