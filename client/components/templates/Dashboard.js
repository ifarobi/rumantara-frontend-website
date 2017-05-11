import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { v4 } from 'uuid'

import Navigation from 'react-toolbox/lib/navigation'

import Anchor from '../atoms/Anchor'

import style from './styles/Dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.renderNav = this.renderNav.bind(this)
    this.renderAnchor = this.renderAnchor.bind(this)
  }
  componentWillMount() {
    if (!this.props.isAuthenticated) {
      this.props.dispatch(push('/login'))
    }
  }
  renderAnchor(menus) {
    return menus.map(d => (
      <Anchor
        key={v4()}
        className={style.nav}
        to={d.to}
      >
        {d.label}
      </Anchor>
    ))
  }
  renderNav() {
    return (
      <div className={style.navContainer}>
        <div className="pageContainer">
          <Navigation type="horizontal" className={style.navWrapper}>
            {this.renderAnchor([{
              to: '/dashboard',
              label: 'Dashboard',
            }, {
              to: '/dashboard/inbox',
              label: 'Inbox',
            }, {
              to: '/dashboard/rooms',
              label: 'Your Rooms',
            }, {
              to: '/dashboard/trip',
              label: 'Your Trips',
            }, {
              to: '/dashboard/profile',
              label: 'Profile',
            }])}
          </Navigation>
        </div>
      </div>
    )
  }
  render() {
    const { children } = this.props
    return (
      <div className="dashboardContainer">
        {this.renderNav()}
        {children}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(Dashboard)
