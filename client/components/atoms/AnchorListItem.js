import React from 'react'
import Anchor from './Anchor'
import { ListItem } from 'react-toolbox/lib/list'

import style from './styles/Anchor.css'

const AnchorListItem = ({
  to,
  ...props
}) => (
  <Anchor className={style.anchorListItem} to={to}>
    <ListItem {...props} />
  </Anchor>
)

export default AnchorListItem
