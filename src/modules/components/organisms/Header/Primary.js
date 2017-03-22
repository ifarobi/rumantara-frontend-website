import React, { Component } from 'react';

import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Search from 'grommet/components/Search';

class Primary extends Component {
  render() {
    return(
      <Header>
        <Title>Rumantara</Title>
        <Box
          flex={true}
          justify='end'
          direction='row'
          responsive={true}>
            <Search
              fill={true}
              size='medium'
              placeholder='Search'
              dropAlign={{"right": "right"}}/>
          </Box>
      </Header>
    )
  }
}

export default Primary;
