import React, { Component } from 'react'
import cookie from 'react-cookie'

import Panel from '../../components/organisms/Panel'
import Image from '../../components/atoms/Image'
import Anchor from '../../components/atoms/Anchor'

import style from '../styles/Dashboard.css'

const user = cookie.load('user')
const photoProfile = user.profile.data.profile_photo_url !== null ? user.profile.data.profile_photo_url : '/public/images/default_user.png'
const Dashboard = () => (
  <section className="pageContainer">
    <div className="row">
      <div className="col-sm-5 col-md-3">
        <div className={style.photoContainer}>
          <Image src={photoProfile} alt={user.name} full={true} />
        </div>
        <Panel className="text-center">
          <h2 className={style.userName}>{user.name}</h2>
          <Anchor primary={true} to={`/show/user/${user.id}`}>View Profile</Anchor>
          <br />
          <Anchor primary={true} to="/dashboard/profile">Edit Profile</Anchor>
        </Panel>
      </div>
      <div className="col-sm-7 col-md-9">
        <Panel title="Notification">
          <p>Please confirm your email address by clicking on the link we just emailed you. If you cannot find the email, you can</p>
        </Panel>
      </div>
    </div>
  </section>
)

export default Dashboard