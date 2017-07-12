import React from 'react'
import { List, ListSubHeader, ListDivider } from 'react-toolbox/lib/list'

import AnchorListItem from '../../components/atoms/AnchorListItem'
import style from '../styles/Dashboard.css'

const Profile = ({
  children,
}) => (
  <section className="pageContainer">
    <div className="row">
      <div className="col-sm-3">
        <List>
          <ListSubHeader caption="Profile Preference" />
          <AnchorListItem to="/dashboard/profile" caption="Edit Profile" />
          <AnchorListItem to="/dashboard/profile/bank" caption="Bank Account" />
          <ListDivider />
          <ListSubHeader caption="Your Wallet" />
          <AnchorListItem to="/dashboard/profile/wallet" caption="Your Wallet" />
        </List>
      </div>
      <div className="col-sm-9">
        {children}
      </div>
    </div>
  </section>
)

export default Profile
