import React, { Component } from 'react'

import Anchor from '../../components/atoms/Anchor'
import style from '../styles/Dashboard.css'

const Profile = ({
  children,
}) => (
  <section className="pageContainer">
    <div className="row">
      <div className="col-sm-3">
        <ul className={style.sideBarMenuContainer}>
          <li>
            <Anchor to="/dashboard/profile/">Edit Profile</Anchor>
          </li>
          <li>
            <Anchor to="/dashboard/profile/bank">Bank Account</Anchor>
          </li>
        </ul>
      </div>
      <div className="col-sm-9">
        {children}
      </div>
    </div>
  </section>
)

export default Profile
