import React, { Component } from 'react';

import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import App from 'grommet/components/App';
import Image from 'grommet/components/Image';

import Nav from '../Navigation/Primary';

class Primary extends Component {
  render() {
    return(
      <Header className='container'>
        <Title>
          <Image src="/public/images/logo.png" size='small' />
        </Title>
        <Box
          flex={true}
          justify='end'
          direction='row'
          responsive={true}>
            <Nav/>
          </Box>
      </Header>
    )
  }
}

export default Primary;
