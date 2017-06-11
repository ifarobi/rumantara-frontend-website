import React, { Component } from 'react'
import classnames from 'classnames'
import axios from 'axios'
import { List, ListSubHeader, ListDivider } from 'react-toolbox/lib/list'
import Button from 'react-toolbox/lib/button'

import Anchor from '../../components/atoms/Anchor'
import AnchorListItem from '../../components/atoms/AnchorListItem'
import RoomListing from '../../components/organisms/RoomListing'
import style from '../styles/Dashboard.css'

const Rooms = ({
  children,
}) => (
  <section className="pageContainer">
    <div className="row">
      <div className="col-sm-3">
        <List>
          <ListSubHeader caption="Your Room Listing" />
          <AnchorListItem to="/dashboard/rooms" caption="Room Listing" />
          <ListDivider />
          <AnchorListItem to="/dashboard/rooms/new" caption="Add New Listing" leftIcon="add" />
        </List>
      </div>
      <div className="col-sm-9">
        { children }
      </div>
    </div>
  </section>
)

export default Rooms
