import React from 'react'

import style from '../styles/Dashboard.css'
import Anchor from '../../components/atoms/Anchor'

const Reservations = ({
  children,
}) => (
  <section className="pageContainer">
    <div className="row">
      <div className="col-sm-3">
        <ul className={style.sideBarMenuContainer}>
          <li>
            <Anchor to="/dashboard/reservations/">Travel Reservations</Anchor>
          </li>
          <li>
            <Anchor to="/dashboard/reservations/room">Room Reservation</Anchor>
          </li>
        </ul>
      </div>
      <div className="col-sm-9">
        {children}
      </div>
    </div>
  </section>
)

export default Reservations
