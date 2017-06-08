import React, { Component } from 'react'
import classnames from 'classnames'
import axios from 'axios'

import Anchor from '../../components/atoms/Anchor'
// import Panel from '../../components/organisms/Panel'
import RoomListing from '../../components/organisms/RoomListing'
import style from '../styles/Dashboard.css'

const Rooms = ({
  children,
}) => (
  <section className="pageContainer">
    <div className="row">
      <div className="col-sm-3">
        <ul className={style.sideBarMenuContainer}>
          <li>
            <Anchor to="/dashboard/rooms">Your Listing</Anchor>
          </li>
          <li>
            <Anchor to="/dashboard/rooms">Your Listing</Anchor>
          </li>
          <li>
            <Anchor to="/dashboard/rooms">Your Listing</Anchor>
          </li>
        </ul>
        <Anchor to="/dashboard/rooms/new" className={classnames('btn', style.btnSidebar)}>Add New Listing</Anchor>
      </div>
      <div className="col-sm-9">
        { children }
      </div>
    </div>
  </section>
)

export default Rooms
