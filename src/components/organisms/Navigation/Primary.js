import React from 'react'

import Menu from 'grommet/components/Menu'

import NavAnchor from '../../atoms/Anchor/Nav'

const Primary = () => (
  <Menu
    inline={true}
    responsive={true}
    direction="row"
  >
    <NavAnchor to="/host">Jadi Tuan Rumah</NavAnchor>
    <NavAnchor to="/help">Bantuan</NavAnchor>
    <NavAnchor to="/login">Masuk</NavAnchor>
  </Menu>
)

export default Primary
